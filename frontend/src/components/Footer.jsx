import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <div className="pt-20  text-black-500 py-10 px-5 md:px-10">
      {/* Footer Main Content */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & Description */}
        <div className="space-y-3">
          <img src={assets.logo} alt="Logo" className="w-32" />
          <p className="text-gray-00 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur vel labore et voluptate voluptates iste..
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-lg font-semibold mb-3">Company</p>
          <ul className="space-y-2 text-gray-800 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <p className="text-lg font-semibold mb-3">Get In Touch</p>
          <ul className="space-y-2 text-gray-800 text-sm">
            <li className="hover:text-white cursor-pointer">📞 89834222</li>
            <li className="hover:text-white cursor-pointer">📧 abc@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-5 text-center text-gray-500 text-sm">
        <p>© 2025 All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
