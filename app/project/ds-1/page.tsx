"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";

interface ProjectDetail {
  id: string;
  title: string;
  category: "data_science" | "data_engineering" | "data_analytics";
  fullDescription: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  technologies: string[];
  demoLink?: string;
  githubLink?: string;
  highlights: string[];
  duration: string;
  role: string;
  challenges: string[];
  solutions: string[];
}

const projectDetails: ProjectDetail = {
  id: "ds-1",
  title: "Customer Churn Prediction",
  category: "data_science",
  fullDescription: "A machine learning model that predicts customer churn with 85% accuracy using historical customer behavior data. This project helps businesses identify at-risk customers and take proactive retention measures.",
  thumbnail: "/images/projects/churn-prediction.jpg",
  images: [
    "/images/projects/churn-1.jpg",
    "/images/projects/churn-2.jpg",
    "/images/projects/churn-3.jpg"
  ],
  tags: ["Machine Learning", "Python", "Scikit-learn", "XGBoost"],
  technologies: [
    "Python 3.8",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "XGBoost",
    "Feature Engineering",
    "Flask API",
    "Docker"
  ],
  demoLink: "https://demo-churn-prediction.example.com",
  githubLink: "https://github.com/example/churn-prediction",
  highlights: [
    "85% prediction accuracy",
    "Processed 1M+ customer records",
    "Reduced customer churn by 25%",
    "Automated reporting system"
  ],
  duration: "3 months",
  role: "Lead Data Scientist",
  challenges: [
    "Handling imbalanced dataset",
    "Real-time prediction requirements",
    "Complex feature engineering needs",
    "Integration with existing systems"
  ],
  solutions: [
    "Implemented SMOTE for balanced training",
    "Built scalable API with Flask",
    "Created automated feature pipeline",
    "Developed microservice architecture"
  ]
};

const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isAutoPlaying) {
      intervalId = setInterval(nextImage, 3000);
    }
    return () => clearInterval(intervalId);
  }, [isAutoPlaying, nextImage]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div 
      className="relative mb-12"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-[400px] sm:h-[500px] rounded-xl overflow-hidden group">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentImageIndex]}
            alt={`Project screenshot ${currentImageIndex + 1}`}
            layout="fill"
            objectFit="cover"
            priority
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </motion.div>

        {/* Navigation Arrows */}
        <motion.button
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={prevImage}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={20} />
        </motion.button>

        <motion.button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={nextImage}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowRight size={20} />
        </motion.button>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 3,
              repeat: isAutoPlaying ? Infinity : 0,
              repeatType: "loop",
            }}
          />
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentImageIndex(index);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 5000);
            }}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentImageIndex === index 
                ? 'bg-blue-500 scale-110' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectDetailPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link href="/project" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="mr-2" />
          Back to Projects
        </Link>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center justify-between mb-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                {projectDetails.title}
              </h1>
              <span className="px-4 py-1 bg-blue-500 rounded-full text-sm">
                {projectDetails.category.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <p className="text-gray-400 text-lg mb-6">{projectDetails.fullDescription}</p>
            
            {/* Action Buttons */}
            <div className="flex gap-4 flex-wrap">
              {projectDetails.demoLink && (
                <motion.a
                  href={projectDetails.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="mr-2" size={20} />
                  View Live Demo
                </motion.a>
              )}
              {projectDetails.githubLink && (
                <motion.a
                  href={projectDetails.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gray-800 rounded-lg text-white font-semibold hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="mr-2" size={20} />
                  View Source Code
                </motion.a>
              )}
            </div>
          </div>

          {/* Image Carousel */}
          <ImageCarousel images={projectDetails.images} />

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Project Highlights</h2>
              <ul className="space-y-2 mb-8">
                {projectDetails.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {highlight}
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {projectDetails.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Challenges & Solutions</h2>
              <div className="space-y-6">
                {projectDetails.challenges.map((challenge, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4">
                    <p className="text-red-400 mb-2">Challenge:</p>
                    <p className="text-gray-300 mb-3">{challenge}</p>
                    <p className="text-green-400 mb-2">Solution:</p>
                    <p className="text-gray-300">{projectDetails.solutions[index]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;