import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Putu Wistika</h3>
            <p className="text-sm md:text-base text-gray-400 mb-6"> <b>Adaptive</b>. <b>Integrity</b>. <b>Humble</b>. <b>Self-starter Mindset</b>.   </p>
            <h4 className="text-lg md:text-xl font-semibold mb-4">Connect</h4>
            <div className="flex space-x-6 md:space-x-4">
              <a href="https://github.com/putuwistika" target="_blank" rel="noopener noreferrer" className="text-3xl md:text-2xl hover:text-blue-400 transition-colors duration-200">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/putuwistika" target="_blank" rel="noopener noreferrer" className="text-3xl md:text-2xl hover:text-blue-400 transition-colors duration-200">
                <FaLinkedin />
              </a>
              <a href="https://instagram.com/ferrywistika" target="_blank" rel="noopener noreferrer" className="text-3xl md:text-2xl hover:text-blue-400 transition-colors duration-200">
                <FaInstagram />
              </a>
              <a href="mailto:putuferrywistika@gmail.com" className="text-3xl md:text-2xl hover:text-blue-400 transition-colors duration-200">
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-500 text-center">
          <p className="text-sm md:text-base text-gray-400">&copy; {new Date().getFullYear()} I Putu Ferry Wistika. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;