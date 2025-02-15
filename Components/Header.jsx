import { assets } from '@/Assets/assets';
import axios from 'axios';
import Image from 'next/image';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post('/api/email', { email });
    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail('');
    } else {
      toast.error('Subscription failed. Try again.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className="bg-gray-900 text-white py-8 px-6 md:px-16 lg:px-32 shadow-lg"
    >
      {/* Navbar */}
      <div className="flex justify-between items-center">
        <Image src={assets.logo} width={160} alt="Logo" className="cursor-pointer" />
        <div className="flex gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md transition hover:bg-blue-700"
          >
            Get Started
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push('/login')} 
            className="px-5 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 hover:bg-gray-700 transition"
          >
            Admin Login
          </motion.button>
        </div>
      </div>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center my-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Stay Informed with the Latest Blogs
        </h1>
        <p className="mt-4 text-gray-300 max-w-xl mx-auto">
          Discover insightful articles, trends, and knowledge from top experts.
        </p>

        {/* Subscription Form */}
        <motion.form 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.5, duration: 0.6 }}
          onSubmit={onSubmitHandler} 
          className="mt-6 flex max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 outline-none text-gray-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            type="submit" 
            className="px-6 py-2 bg-blue-600 text-white font-medium transition hover:bg-blue-700"
          >
            Subscribe
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default Header;
