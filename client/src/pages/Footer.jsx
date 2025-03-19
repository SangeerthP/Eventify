import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaCopyright } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="w-full bg-black text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        
        {/* Left Section - Company Info */}
        <div className="md:w-1/2">
          <h2 className="text-xl font-bold">My blue ding Events & Services™</h2>
          <p className="mt-2 text-sm">
            We, the Best Event Management Company & Planners are providing world-class services in this field from a long time.
          </p>
        </div>

        {/* Right Section - Contact Info */}
        <div className="md:w-1/2 md:text-right">
          <h3 className="text-lg font-semibold">Contact</h3>
          <p>eventsbyteam@govinda.com</p>
          <p>9353935383 or 8622349601</p>
          <p>Gottigere, Bannerghatta Road, Bangalore, Karnataka, India - 560 083</p>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center gap-4 mt-6">
        <FaFacebook className="text-xl cursor-pointer hover:text-gray-400" />
        <FaInstagram className="text-xl cursor-pointer hover:text-gray-400" />
        <FaLinkedin className="text-xl cursor-pointer hover:text-gray-400" />
        <FaYoutube className="text-xl cursor-pointer hover:text-gray-400" />
      </div>

      {/* Copyright */}
      <div className="text-center text-sm mt-6 border-t border-gray-600 pt-4">
        <FaCopyright className="inline-block mr-1" /> Copyright My blue ding Events & Services 2025. All Rights Reserved.
      </div>
    </div>
  );
}
