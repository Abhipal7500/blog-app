import { assets } from '@/Assets/assets';
import Image from 'next/image';
import { motion } from 'framer-motion';
import React from 'react';

const Footer = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      className="bg-gray-900 text-gray-300 py-8 px-6 flex flex-col sm:flex-row justify-between items-center"
    >
      {/* Logo */}
      <Image src={assets.logo_light} alt="Logo" width={140} className="cursor-pointer" />

      {/* Copyright */}
      <p className="text-sm mt-4 sm:mt-0">© 2025 Blogger. All Rights Reserved.</p>

      {/* Social Icons */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex gap-4"
      >
        <Image src={assets.facebook_icon} alt="Facebook" width={30} className="cursor-pointer hover:opacity-75 transition" />
        <Image src={assets.twitter_icon} alt="Twitter" width={30} className="cursor-pointer hover:opacity-75 transition" />
        <Image src={assets.googleplus_icon} alt="Google Plus" width={30} className="cursor-pointer hover:opacity-75 transition" />
      </motion.div>
    </motion.div>
  );
};

export default Footer;
