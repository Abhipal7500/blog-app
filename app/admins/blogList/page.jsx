'use client'
import BlogTableItem from '@/Components/AdminComponents/BlogTableItem'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import UpdateBlogModal from '@/Components/AdminComponents/UpdateBlogModal';

const page = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const fetchBlogs = async () => {
    const response = await axios.get('/api/blog');
    setBlogs(response.data.blogs);
  }

  const deleteBlog = async (mongoId) => {
    const response = await axios.delete('/api/blog', {
      params: { id: mongoId }
    });
    toast.success(response.data.msg);
    fetchBlogs();
  }

  const openUpdateModal = (id, title, author, date) => {
    setSelectedBlog({ id, title, author, date });
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  }

  useEffect(() => {
    fetchBlogs()
  }, []);

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All blogs</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase bg-gray-50">
            <tr>
              <th scope="col" className="hidden sm:block px-6 py-3">Author name</th>
              <th scope="col" className="px-6 py-3">Blog Title</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-2 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => (
              <BlogTableItem key={index} mongoId={item._id} title={item.title} author={item.author} 
                authorImg={item.authorImg} date={item.date} deleteBlog={deleteBlog} openUpdateModal={openUpdateModal} />
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && <UpdateBlogModal blog={selectedBlog} closeModal={closeModal} fetchBlogs={fetchBlogs} />}
    </div>
  )
}

export default page;
