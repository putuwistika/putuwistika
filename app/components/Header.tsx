"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import ShimmerButton from '../../components/ui/shimmer-button';
import Image from 'next/image';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseEnter = (submenu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveSubmenu(submenu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 300);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const ResourcesMenuItem: React.FC<{ icon: string; text: string; description: string; href: string }> = ({ icon, text, description, href }) => (
    <Link href={href} className="block">
      <div className="flex items-start p-4 hover:bg-gray-700 transition-colors duration-200">
        <div className="w-6 h-6 mr-3 flex items-center justify-center bg-gray-600 rounded-full flex-shrink-0">
          <span className="text-xs">{icon}</span>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white font-lato">{text}</h3>
          <p className="text-xs text-gray-300 mt-1 font-lato leading-tight">{description}</p>
        </div>
      </div>
    </Link>
  );

  const ResourcesSubMenu: React.FC = () => (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-0">
        <ResourcesMenuItem icon="📝" text="Blog" description="Read the writings about data, hobbies, etc" href="/resources/blog" />
        <ResourcesMenuItem icon="🎓" text="Academics" description="Get informed about my academics and certifications" href="/resources/academics" />
        <ResourcesMenuItem icon="🖥️" text="Speakership Portfolio" description="Visit my latest speakership portfolio" href="/resources/speakership" />
        <ResourcesMenuItem icon="📊" text="Case Studies" description="Latest news, tips, and best practices" href="/resources/case-studies" />
      </div>
      <div className="w-full md:w-1/4 flex border-t md:border-t-0 md:border-l border-gray-700">
        <Link href="/resources/case-studies/multimodal-ocr" className="flex items-center w-full">
          <div className="w-1/3 h-full flex items-center justify-center p-2">
            <div className="relative w-full h-0 pb-[100%]">
              <Image
                src="/images/articles/gcp_logo.png"
                alt="Case Study Preview"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="w-2/3 p-4">
            <h3 className="text-sm font-bold text-white mb-2">CASE STUDY</h3>
            <p className="text-xs text-white leading-tight">
              How Multimodal OCR able to cut manual document processing time up to 90%
            </p>
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <header className={`fixed top-0 left-0 w-full z-50 font-lato transition-colors duration-300 ${isScrolled ? 'bg-black' : 'bg-transparent'}`}>
      <div className="relative w-full" onMouseLeave={handleMouseLeave}>
        {/* Menu box */}
        <div className="mx-auto w-full md:w-3/4 h-20">
          <nav className="container mx-auto px-4 md:px-6 h-full">
            <div className="flex items-center justify-between h-full">
              {/* Left space (logo) */}
              <div className="flex-shrink-0">
                <Link href="/" className="text-xl font-bold text-white">
                  PutuWistika
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button onClick={toggleMobileMenu} className="text-white">
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              {/* Desktop menu */}
              <div className="hidden md:flex justify-center space-x-6">
                <Link href="/" className="text-white hover:text-gray-300">
                  Home
                </Link>
                <Link href="/about" className="text-white hover:text-gray-300">
                  About
                </Link>
                <div className="relative" onMouseEnter={() => handleMouseEnter('project')}>
                  <button className="flex items-center space-x-1 text-white hover:text-gray-300">
                    <span>Project</span>
                    <ChevronDown size={20} />
                  </button>
                </div>
                <Link href="/achievement" className="text-white hover:text-gray-300">
                Achievement
                </Link>
              </div>

              {/* CV button */}
              <div className="hidden md:flex justify-end">
                <ShimmerButton
                  shimmerColor="#ffffff33"
                  background="linear-gradient(#00000033, #00000033, #00000033)"
                >
                  Ask Me Anything
                </ShimmerButton>
              </div>
            </div>
          </nav>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-white hover:bg-gray-700">Home</Link>
              <Link href="/about" className="block px-3 py-2 text-white hover:bg-gray-700">About</Link>
              <button onClick={() => setActiveSubmenu('project')} className="w-full text-left px-3 py-2 text-white hover:bg-gray-700">Project</button>
              <Link href="/achievement" className="block px-3 py-2 text-white hover:bg-gray-700">Achievement</Link>
            </div>
            <div className="px-2 py-3">
              <ShimmerButton
                shimmerColor="#ffffff33"
                background="linear-gradient(#00000033, #00000033, #00000033)"
                className="w-full"
              >
                Ask Me Anything
              </ShimmerButton>
            </div>
          </div>
        )}

        {/* Submenu background box */}
        {activeSubmenu && (
          <div className="absolute left-0 w-full bg-black shadow-lg">
            {/* Submenu content box */}
            <div className="mx-auto bg-black w-full md:w-[900px]">
              <div className="w-full mx-auto">
                {activeSubmenu === 'project' && <ResourcesSubMenu />}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;