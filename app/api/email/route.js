import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";
import redis from "@/lib/redis"; 


async function ensureDBConnection() {
  if (!global.isDBConnected) {
    await ConnectDB();
    global.isDBConnected = true;
  }
}

export async function POST(request) {
  try {
    await ensureDBConnection();
    const body = await request.json();

    if (!body.email) {
      return NextResponse.json({ success: false, msg: "Email is required" }, { status: 400 });
    }

    const emailData = { email: body.email };
    await EmailModel.create(emailData);

    await redis.del("emails");

    return NextResponse.json({ success: true, msg: "Email Subscribed" }, { status: 201 });
  } catch (error) {
    console.error("Error subscribing email:", error);
    return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await ensureDBConnection();

    const cachedEmails = await redis.get("emails");
    if (cachedEmails) {
      console.log("Cache hit - Returning cached data");
      return NextResponse.json({ emails: JSON.parse(cachedEmails) }, { status: 200 });
    }

    console.log("Cache miss - Fetching from database");
    const emails = await EmailModel.find({});

    await redis.set("emails", JSON.stringify(emails), "EX", 600);

    return NextResponse.json({ emails }, { status: 200 });
  } catch (error) {
    console.error("Error fetching emails:", error);
    return NextResponse.json({ success: false, msg: "Error fetching emails" }, { status: 500 });
  }
}


export async function DELETE(request) {
  try {
    await ensureDBConnection();
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, msg: "ID is required" }, { status: 400 });
    }

    await EmailModel.findByIdAndDelete(id);


    await redis.del("emails");

    return NextResponse.json({ success: true, msg: "Email Deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting email:", error);
    return NextResponse.json({ success: false, msg: "Error deleting email" }, { status: 500 });
  }
}
