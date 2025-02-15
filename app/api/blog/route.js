import { ConnectDB } from "@/lib/config/db"
import mongoose from "mongoose"; // ✅ Import mongoose
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server")
import { writeFile } from 'fs/promises'
const fs = require('fs')

const LoadDB = async () => {
  await ConnectDB();
}

LoadDB();


// API Endpoint to get all blogs
export async function GET(request) {

  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  }
  else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs })
  }
}


// API Endpoint For Uploading Blogs
export async function POST(request) {

  const formData = await request.formData();
  const timestamp = Date.now();

  const image = formData.get('image');
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timestamp}_${image.name}`;
  await writeFile(path, buffer);
  const imgUrl = `/${timestamp}_${image.name}`;

  const blogData = {
    title: `${formData.get('title')}`,
    description: `${formData.get('description')}`,
    category: `${formData.get('category')}`,
    author: `${formData.get('author')}`,
    image: `${imgUrl}`,
    authorImg: `${formData.get('authorImg')}`
  }

  await BlogModel.create(blogData);
  console.log("Blog Saved");

  return NextResponse.json({ success: true, msg: "Blog Added" })
}

// Creating API Endpoint to delete Blog

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get('id');
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`, () => { });
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Blog Deleted" });
}



export async function PUT(request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id");


    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Blog ID" }, { status: 400 });
    }

    const existingBlog = await BlogModel.findById(id);
    if (!existingBlog) {
      return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
    }

    let updateData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
    };

    console.log("Update Data:", updateData); // Debugging log

    // If a new image is uploaded, save it and delete the old one
    const image = formData.get("image");
    if (image && typeof image === "object") {
      const imageByteData = await image.arrayBuffer();
      const buffer = Buffer.from(imageByteData);
      const timestamp = Date.now();
      const newImagePath = `./public/${timestamp}_${image.name}`;

      await writeFile(newImagePath, buffer);
      updateData.image = `/${timestamp}_${image.name}`;

      console.log("New Image Path:", updateData.image); // Debugging log

      // Delete old image
      if (existingBlog.image) {
        await fs.promises.unlink(`./public${existingBlog.image}`).catch((err) => {
          console.error("Error deleting old image:", err);
        });
      }
    }

    // Update the blog post
    const updatedBlog = await BlogModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedBlog) {
      return NextResponse.json({ success: false, msg: "Failed to update blog" }, { status: 500 });
    }

    console.log("Updated Blog:", updatedBlog); // Debugging log

    return NextResponse.json({ success: true, msg: "Blog Updated", blog: updatedBlog });

  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
