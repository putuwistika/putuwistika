"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, Award } from 'lucide-react';
import CombinedAnimation from "@/components/magicui/hero-anim";
import WordRotate from "@/components/magicui/word-rotate";

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    const stars: { x: number; y: number; radius: number; opacity: number; speed: number }[] = [];

    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random(),
        speed: 0.1 + Math.random() * 0.3
      });
    }

    function drawStars() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        star.opacity = Math.sin(Date.now() * 0.001 * star.speed) * 0.5 + 0.5;
      });

      const lightGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height + 500, 0,
        canvas.width / 2, canvas.height + 500, canvas.height
      );
      lightGradient.addColorStop(0, 'rgba(66, 103, 212, 0.2)');
      lightGradient.addColorStop(1, 'rgba(66, 103, 212, 0)');
      ctx.fillStyle = lightGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(drawStars);
    }

    drawStars();

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

const ProfileImage: React.FC = () => {
  return (
    <motion.div 
      className="relative w-[350px] h-[350px] mx-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-blue-500/30 p-4 shadow-2xl">
        <div className="relative w-full h-full overflow-hidden rounded-xl">
          <Image
            src="/images/profile/3.png"
            alt="I Putu Ferry Wistika - Data Scientist & Engineer"
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300 hover:scale-105"
            priority
          />
          {/* Floating badges */}
          <motion.div 
            className="absolute top-4 right-4 bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Available for Hire
          </motion.div>
          <motion.div 
            className="absolute bottom-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            ITB Graduate
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ActionButton: React.FC<{ 
  href: string; 
  children: React.ReactNode; 
  variant: 'primary' | 'secondary';
  icon?: React.ReactNode;
}> = ({ href, children, variant, icon }) => {
  const baseClasses = "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform";
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl hover:scale-105",
    secondary: "bg-gray-800/60 text-white border border-gray-600 hover:bg-gray-700/60 hover:border-blue-500/50 backdrop-blur-sm"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link 
        href={href}
        className={`${baseClasses} ${variants[variant]}`}
      >
        {children}
        {icon}
      </Link>
    </motion.div>
  );
};

const HeroSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      <div className="absolute inset-0 z-0">
        <video
          src="/videos/effect_ray.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-20"></div>
      
      <div className="container mx-auto px-6 z-10 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="lg:w-1/2 text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold">Currently at DANA Indonesia</span>
              </div>
              
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
                    Hello, I'm
                  </span>
                </h1>
                
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white font-lato">
                  <CombinedAnimation
                    text="I Putu Ferry Wistika"
                    className="text-4xl lg:text-5xl font-bold text-white font-lato"
                  />
                </h2>

                <div className="text-gray-300 flex flex-wrap items-center gap-2 text-xl">
                  <span className="text-white font-semibold">I'm a</span>
                  <WordRotate 
                    className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-500 text-transparent bg-clip-text" 
                    words={["Data Scientist", "Algorithm Researcher", "Mathematical Modeler"]}
                  />
                </div>
              </div>

              <motion.p 
                className="text-lg text-gray-300 leading-relaxed max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="text-purple-400 font-semibold">Self-starter</span> dedicated to translating complex data insights into actionable business strategies. 
                I leverage expertise in <span className="text-blue-400 font-semibold">mathematics, statistics, and advanced programming</span> to drive organizational growth.
              </motion.p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <ActionButton href="/about" variant="primary" icon={<ArrowRight className="w-5 h-5" />}>
                Discover My Journey
              </ActionButton>
              <ActionButton href="/project" variant="secondary" icon={<Eye className="w-5 h-5" />}>
                View Projects
              </ActionButton>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              className="flex flex-col gap-2 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <span>📧 putuferrywistika@gmail.com</span>
              <span>📍 Jakarta, Indonesia</span>
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="lg:w-1/2 relative">
            <ProfileImage />
            
            {/* Single Certification Stat */}
            <motion.div 
              className="mt-8 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center hover:border-blue-500/50 transition-all">
                <div className="flex justify-center mb-3 text-blue-400">
                  <Award className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">8+</div>
                <div className="text-gray-400">Professional Certifications</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20"></div>
    </section>
  );
};

export default HeroSection;