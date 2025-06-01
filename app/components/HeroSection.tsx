"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Eye, Code, Database, Brain, TrendingUp, Award, ChevronDown } from 'lucide-react';
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

    for (let i = 0; i < 200; i++) {
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
      lightGradient.addColorStop(0, 'rgba(66, 103, 212, 0.3)');
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

const BottomCurve: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden">
      <svg
        viewBox="0 0 1440 75"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <rect width="1440" height="600" fill="url(#lightSpectrum)" />
        <path
          d="M0 600V300C240 100 480 0 720 0C960 0 1200 100 1440 300V600H0Z"
          fill="#000000"
        />
      </svg>
    </div>
  );
};

const ProfileImage: React.FC = () => {
  return (
    <motion.div 
      className="relative w-[400px] h-[400px] mx-auto"
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

const StatsCard: React.FC<{ icon: React.ReactNode; number: string; label: string; delay: number }> = ({ 
  icon, number, label, delay 
}) => (
  <motion.div 
    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center hover:border-blue-500/50 transition-all"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.05 }}
  >
    <div className="flex justify-center mb-2 text-blue-400">
      {icon}
    </div>
    <div className="text-2xl font-bold text-white mb-1">{number}</div>
    <div className="text-sm text-gray-400">{label}</div>
  </motion.div>
);

const ActionButton: React.FC<{ 
  href: string; 
  children: React.ReactNode; 
  variant: 'primary' | 'secondary';
  icon?: React.ReactNode;
  download?: boolean;
}> = ({ href, children, variant, icon, download = false }) => {
  const baseClasses = "inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform";
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl hover:scale-105",
    secondary: "bg-gray-800/60 text-white border border-gray-600 hover:bg-gray-700/60 hover:border-blue-500/50 backdrop-blur-sm"
  };

  const Component = download ? 'a' : Link;
  const props = download ? { href, download: true } : { href };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Component 
        {...props}
        className={`${baseClasses} ${variants[variant]}`}
      >
        {children}
        {icon}
      </Component>
    </motion.div>
  );
};

const ScrollIndicator: React.FC = () => (
  <motion.div 
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-center z-20"
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <div className="text-sm mb-2">Scroll to explore</div>
    <ChevronDown className="w-6 h-6 mx-auto" />
  </motion.div>
);

const HeroSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <AnimatedBackground />
      <div className="absolute inset-0 z-0">
        <video
          src="/videos/effect_ray.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-30"></div>
      
      <div className="container mx-auto px-4 z-10 relative flex items-center justify-center min-h-screen">
        <div className="flex flex-col lg:flex-row items-center gap-12 w-full max-w-7xl">
          {/* Left Content */}
          <div className="lg:w-1/2 text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold">Currently at DANA Indonesia</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
                  Hello, I'm
                </span>
              </h1>
              
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white font-lato">
                <CombinedAnimation
                  text="I Putu Ferry Wistika"
                  className="text-4xl lg:text-6xl font-bold text-white font-lato"
                />
              </h2>

              <div className="mb-6 text-gray-300 flex flex-wrap items-center gap-2">
                <span className="text-2xl font-semibold text-white">I'm a</span>
                <WordRotate 
                  className="text-3xl font-bold bg-gradient-to-r from-red-500 to-purple-500 text-transparent bg-clip-text" 
                  words={["Data Scientist", "Algorithm Researcher", "Mathematical Modeler", "ML Engineer"]}
                />
              </div>

              <motion.p 
                className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="text-purple-400 font-semibold">Self-starter</span> dedicated to translating complex data insights into actionable business strategies. 
                I leverage expertise in <span className="text-blue-400 font-semibold">mathematics, statistics, and advanced programming</span> to drive organizational growth, 
                with a passion for <span className="text-orange-400 font-semibold">algorithm research and mathematical modeling</span>.
              </motion.p>

              <motion.div 
                className="bg-gray-800/30 backdrop-blur-sm border border-blue-500/30 rounded-xl p-4 mb-8 max-w-2xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="flex items-start gap-3">
                  <div className="text-blue-400 mt-1">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Current Impact at DANA Indonesia</h3>
                    <p className="text-gray-300 text-sm">
                      Researched and implemented optimal storage tiers and retention policies, achieving a <span className="text-green-400 font-semibold">71% annual reduction</span> in storage and compute costs. 
                      Performed Pareto analysis on compute nodes and table-query access patterns to identify high-growth or inefficient jobs.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-8"
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
                <ActionButton 
                  href="/resume.pdf" 
                  variant="secondary" 
                  icon={<Download className="w-5 h-5" />}
                  download={true}
                >
                  Download CV
                </ActionButton>
              </motion.div>

              {/* Quick Contact */}
              <motion.div 
                className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <span>📧 putuferrywistika@gmail.com</span>
                <span>📱 +62 81236627276</span>
                <span>📍 Jakarta, Indonesia</span>
              </motion.div>

              {/* Core Values Highlight */}
              <motion.div 
                className="flex flex-wrap gap-4 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-lg px-3 py-2">
                  <Code className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-300 font-medium">Self-Starter Mindset</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-lg px-3 py-2">
                  <Brain className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300 font-medium">Research-Driven</span>
                </div>
                <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-lg px-3 py-2">
                  <TrendingUp className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-300 font-medium">Business Impact</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="lg:w-1/2 relative">
            <ProfileImage />
            
            {/* Achievement Stats */}
            <motion.div 
              className="mt-8 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <StatsCard 
                icon={<Award className="w-6 h-6" />}
                number="8+"
                label="Certifications"
                delay={1.0}
              />
            </motion.div>
          </div>
        </div>

        {/* Technology Highlights */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <p className="text-gray-400 mb-4">Research & Development Expertise</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Mathematical Modeling", "Algorithm Research", "Statistical Analysis", "Advanced Programming",
              "Machine Learning", "Apache Airflow", "Python", "TensorFlow"
            ].map((tech, index) => (
              <motion.span 
                key={tech}
                className="px-4 py-2 bg-gray-800/40 border border-gray-600/50 rounded-full text-sm text-gray-300 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.1 + index * 0.05 }}
                whileHover={{ scale: 1.1, borderColor: '#3b82f6' }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <ScrollIndicator />
      <BottomCurve />
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent z-30"></div>
    </section>
  );
};

export default HeroSection;