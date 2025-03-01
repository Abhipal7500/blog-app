import { ConnectDB } from "@/lib/config/db";
import mongoose from "mongoose";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables
// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request) {
  try {
    await ConnectDB();
    const blogId = request.nextUrl.searchParams.get("id");

    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      return NextResponse.json(blog);
    } else {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ blogs });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await ConnectDB();
    const formData = await request.formData();

    const image = formData.get("image");
    let imgUrl = "";

    if (image && typeof image === "object") {
      const imageByteData = await image.arrayBuffer();
      const buffer = Buffer.from(imageByteData);
      const uploadResult = await cloudinary.v2.uploader.upload(`data:image/png;base64,${buffer.toString("base64")}`);
      imgUrl = uploadResult.secure_url;
    }

    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl,
      authorImg: formData.get("authorImg"),
    };

    const blog = await BlogModel.create(blogData);
    return NextResponse.json({ success: true, msg: "Blog Added", blog });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await ConnectDB();
    const id = request.nextUrl.searchParams.get("id");

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Blog ID" }, { status: 400 });
    }

    const blog = await BlogModel.findById(id);
    if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    // Delete image from Cloudinary if exists
    if (blog.image) {
      const publicId = blog.image.split("/").pop().split(".")[0]; // Extract public_id from URL
      await cloudinary.v2.uploader.destroy(publicId).catch((err) => console.error("Cloudinary Delete Error:", err));
    }

    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Blog Deleted" });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await ConnectDB();
    const formData = await request.formData();
    const id = formData.get("id");

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Blog ID" }, { status: 400 });
    }

    const existingBlog = await BlogModel.findById(id);
    if (!existingBlog) return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });

    let updateData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
    };

    const image = formData.get("image");
    if (image && typeof image === "object") {
      const imageByteData = await image.arrayBuffer();
      const buffer = Buffer.from(imageByteData);
      const uploadResult = await cloudinary.v2.uploader.upload(`data:image/png;base64,${buffer.toString("base64")}`);
      updateData.image = uploadResult.secure_url;

      // Delete old image from Cloudinary
      if (existingBlog.image) {
        const publicId = existingBlog.image.split("/").pop().split(".")[0];
        await cloudinary.v2.uploader.destroy(publicId).catch((err) => console.error("Cloudinary Delete Error:", err));
      }
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, msg: "Blog Updated", blog: updatedBlog });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
