"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
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
    <div className="relative w-[400px] h-[400px] mx-auto">
      <div className="absolute inset-0 bg-gray-800 bg-opacity-30 rounded-lg backdrop-blur-sm border border-gray-700 p-4">
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          <Image
            src="/images/profile/1.png"
            alt="Profile"
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

const HeroSection: React.FC = () => {
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
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-30"></div>
      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 text-left">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
              Hello, My Name is
            </h1>
            <h2 className="text-6xl font-bold mb-4 text-blue-500 font-lato">
              <CombinedAnimation
                text="I Putu Ferry Wistika"
                className="text-6xl font-bold mb-4 text-blue-500 font-lato"
              />
            </h2>

            <div className="mt-4 text-gray-300 flex items-center">
              <span className="text-2xl font-semibold text-white mr-2">I'm a</span>
              <WordRotate 
                className="text-3xl font-bold bg-gradient-to-r from-red-500 to-purple-500 text-transparent bg-clip-text" 
                words={["Data Scientist", "Data Analyst", "Data Engineer"]}
              />
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <ProfileImage />
          </div>
        </div>
      </div>
      <BottomCurve />
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent z-30"></div>
    </section>
  );
};

export default HeroSection;