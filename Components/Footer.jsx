import { assets } from '@/Assets/assets';
import Image from 'next/image';
import { motion } from 'framer-motion';
import React from 'react';

// Directly import images if needed
import githubIcon from '@/Assets/github.png'; 
import linkedinIcon from '@/Assets/linkedin.png';

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
        <Image src={assets.facebook_icon} alt="Facebook" width={30} height={30} className="cursor-pointer hover:opacity-75 transition" />
        <Image src={assets.twitter_icon} alt="Twitter" width={30} height={30} className="cursor-pointer hover:opacity-75 transition" />
        <Image src={assets.googleplus_icon} alt="Google Plus" width={30} height={30} className="cursor-pointer hover:opacity-75 transition" />
      </motion.div>

      {/* Developer Info */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-4 sm:mt-0 flex flex-col items-center sm:items-end text-sm"
      >
        <p>Developed by <span className="font-semibold">Abhishek Pal</span></p>
        <div className="flex gap-3 mt-2">
          {/* GitHub */}
          <a href="https://github.com/Abhipal7500?tab=repositories" target="_blank" rel="noopener noreferrer">
            <Image src={githubIcon} alt="GitHub" width={30} height={30} className="cursor-pointer hover:opacity-75 transition" />
          </a>
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/abhishek-pal-33182a235/" target="_blank" rel="noopener noreferrer">
            <Image src={linkedinIcon} alt="LinkedIn" width={30} height={30} className="cursor-pointer hover:opacity-75 transition" />
          </a>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default Footer;
