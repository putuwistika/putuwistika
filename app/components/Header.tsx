"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X, Linkedin } from 'lucide-react';
import ShimmerButton from '../../components/ui/shimmer-button';
import { RainbowButton } from '@/components/ui/rainbow-button';
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
    return () => window.removeEventListener('scroll', handleScroll);
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

  const ProjectMenuItem: React.FC<{ icon: string; text: string; description: string; href: string }> = ({ icon, text, description, href }) => (
    <Link href={href} className="block">
      <div className="flex items-start p-4 hover:bg-gray-700 transition-colors duration-200 rounded-lg">
        <div className="w-8 h-8 mr-3 flex items-center justify-center bg-gray-600 rounded-full flex-shrink-0">
          <span className="text-lg">{icon}</span>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white font-lato">{text}</h3>
          <p className="text-xs text-gray-300 mt-1 font-lato leading-tight">{description}</p>
        </div>
      </div>
    </Link>
  );

  const ProjectSubMenu: React.FC = () => (
    <div className="py-4 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProjectMenuItem
          icon="🎯"
          text="All Projects"
          description="View all my projects across different domains"
          href="/project"
        />
        <ProjectMenuItem
          icon="🧠"
          text="Data Science"
          description="Machine Learning and AI projects"
          href="/project?category=data_science"
        />
        <ProjectMenuItem
          icon="⚙️"
          text="Data Engineering"
          description="Data pipeline and infrastructure projects"
          href="/project?category=data_engineering"
        />
        {/* <ProjectMenuItem
          icon="📊"
          text="Data Analytics"
          description="Business intelligence and analytics projects"
          href="/project?category=data_analytics"
        /> */}
      </div>
    </div>
  );

  return (
    <header className={`fixed top-0 left-0 w-full z-50 font-lato transition-colors duration-300 ${isScrolled ? 'bg-black' : 'bg-transparent'}`}>
      <div className="relative w-full" onMouseLeave={handleMouseLeave}>
        <div className="mx-auto w-full md:w-3/4 h-20">
          <nav className="container mx-auto px-4 md:px-6 h-full">
            <div className="flex items-center justify-between h-full">
              <div className="flex-shrink-0">
                <Link href="/" className="text-xl font-bold text-white">
                  PutuWistika
                </Link>
              </div>

              <div className="md:hidden">
                <button onClick={toggleMobileMenu} className="text-white">
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              {/* Desktop menu */}
              <div className="hidden md:flex justify-center space-x-6">
                <RainbowButton href="/">Home</RainbowButton>
                <RainbowButton href="/about">About</RainbowButton>
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter('project')}
                  onMouseLeave={handleMouseLeave}
                >
                  <RainbowButton href="/project" className="flex items-center gap-2">
                    Project
                    <ChevronDown 
                      size={16}
                      className={`transition-transform duration-200 ${
                        activeSubmenu === 'project' ? 'rotate-180' : ''
                      }`}
                    />
                  </RainbowButton>
                  {activeSubmenu === 'project' && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[800px] mt-2 bg-black border border-gray-800 rounded-xl shadow-2xl">
                      <ProjectSubMenu />
                    </div>
                  )}
                </div>
                <RainbowButton href="/achievement">Achievement</RainbowButton>
              </div>

              <div className="hidden md:flex justify-end">
                <a 
                  href="https://www.linkedin.com/in/putuwistika/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ShimmerButton
                    shimmerColor="#0077B5"
                    background="linear-gradient(135deg, #0077B5, #005885)"
                    className="flex items-center gap-2"
                  >
                    <Linkedin size={18} />
                    Connect on LinkedIn
                  </ShimmerButton>
                </a>
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
              <div className="px-3 py-2">
                <button 
                  onClick={() => setActiveSubmenu(activeSubmenu === 'project' ? null : 'project')}
                  className="flex items-center w-full text-white hover:bg-gray-700"
                >
                  Project
                  <ChevronDown 
                    size={16}
                    className={`ml-2 transition-transform duration-200 ${
                      activeSubmenu === 'project' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeSubmenu === 'project' && (
                  <div className="mt-2 pl-4">
                    <Link href="/project" className="block py-2 text-white hover:bg-gray-700">All Projects</Link>
                    <Link href="/project?category=data_science" className="block py-2 text-white hover:bg-gray-700">Data Science</Link>
                    <Link href="/project?category=data_engineering" className="block py-2 text-white hover:bg-gray-700">Data Engineering</Link>
                    {/* <Link href="/project?category=data_analytics" className="block py-2 text-white hover:bg-gray-700">Data Analytics</Link> */}
                  </div>
                )}
              </div>
              <Link href="/achievement" className="block px-3 py-2 text-white hover:bg-gray-700">Achievement</Link>
            </div>
            <div className="px-2 py-3">
              <a 
                href="https://www.linkedin.com/in/putuwistika/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <ShimmerButton
                  shimmerColor="#0077B5"
                  background="linear-gradient(135deg, #0077B5, #005885)"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Linkedin size={18} />
                  Connect on LinkedIn
                </ShimmerButton>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;