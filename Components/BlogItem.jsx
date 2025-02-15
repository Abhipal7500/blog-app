import { assets } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <div className="max-w-[330px] bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden transition hover:shadow-xl">
      {/* Blog Image */}
      <Link href={`/blogs/${id}`}>
        <div className="w-full h-[220px] flex justify-center items-center bg-gray-200 hover:opacity-90 transition">
          <Image 
            src={image} 
            alt={title} 
            width={400} 
            height={400} 
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Category */}
      <p className="ml-4 mt-3 px-2 py-1 inline-block bg-blue-600 text-white text-xs rounded-md">
        {category}
      </p>

      {/* Blog Content */}
      <div className="p-5">
        <h5 className="mb-2 text-lg font-semibold text-gray-800">{title}</h5>
        <p className="mb-3 text-sm text-gray-600">{description.slice(0, 120)}...</p>

        {/* Read More Link */}
        <div className="flex items-center">
          <Link href={`/blogs/${id}`} className="text-blue-600 font-medium hover:underline">
            Read more
          </Link>
          <Image src={assets.arrow} className="ml-2" alt="Arrow" width={12} />
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
