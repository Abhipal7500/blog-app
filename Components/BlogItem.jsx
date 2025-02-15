import { assets } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import React from 'react';

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.03 }}
      className="max-w-[330px] bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden transition hover:shadow-xl"
    >
      {/* Blog Image */}
      <Link href={`/blogs/${id}`}>
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="w-full h-[220px] flex justify-center items-center bg-gray-200 hover:opacity-90 transition"
        >
          <Image 
            src={image} 
            alt={title} 
            width={400} 
            height={400} 
            className="w-full h-full object-cover"
          />
        </motion.div>
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
        <motion.div 
          whileHover={{ x: 5 }}
          className="flex items-center"
        >
          <Link href={`/blogs/${id}`} className="text-blue-600 font-medium hover:underline">
            Read more
          </Link>
          <Image src={assets.arrow} className="ml-2" alt="Arrow" width={12} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlogItem;
