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
  projectStages: { title: string; description: string }[];
}

const projectDetails: ProjectDetail = {
  id: "de-1",
  title: "Real-time Data Pipeline",
  category: "data_engineering",
  fullDescription: "A comprehensive real-time data pipeline project focused on fraud detection using Apache Kafka for stream processing. The pipeline integrates various technologies including Docker, MongoDB, PostgreSQL, and Apache Airflow for orchestration, demonstrating a complete end-to-end data engineering solution.",
  thumbnail: "/images/projects/de1.png",
  images: [
    "/images/projects/de1.png",
    // "/images/projects/de2.png",
    // "/images/projects/de3.png"
  ],
  tags: ["Apache Kafka", "Spark", "AWS", "Python"],
  technologies: [
    "Apache Kafka",
    "Docker",
    "MongoDB",
    "PostgreSQL",
    "Apache Airflow",
    "Python 3.12.2",
    "Jupyter Notebook",
    "Google Data Studio",
    "AWS",
    "Apache Spark"
  ],
  demoLink: "https://drive.google.com/file/d/19CfpsxNtOqe1_9Eacyf03GX9kSWM3WFk/view?usp=sharing",
  highlights: [
    "Built end-to-end real-time fraud detection pipeline",
    "Implemented data orchestration using Apache Airflow",
    "Developed stream processing with Apache Kafka",
    "Created visualization dashboard using Google Data Studio"
  ],
  duration: "3 months",
  role: "Data Engineer",
  projectStages: [
    {
      title: "System Setup",
      description: "Implemented system requirements including Kafka, Docker, Zookeeper, MongoDB, PostgreSQL, and Apache Airflow configuration. Created DAG python files for data orchestration."
    },
    {
      title: "Data Pipeline Development",
      description: "Set up Jupyter environment for local testing, integrated FraudModel.py for transaction processing, and established data flow patterns."
    },
    {
      title: "Library Integration",
      description: "Installed and configured 9 essential Python libraries in the 'DE - STREAM PROCESSING' folder, ensuring successful execution of the pipeline components."
    },
    {
      title: "Database Connection",
      description: "Established PostgreSQL database connection and successfully executed data dump operations for local database population."
    },
    {
      title: "Producer Implementation",
      description: "Created transaction simulation system using Kafka producer, implementing real-time data streaming to topic 'ftde01-project4'."
    },
    {
      title: "Consumer Development",
      description: "Developed and optimized consumer scripts for Python 3.12.2, successfully capturing and processing streamed data."
    },
    {
      title: "Data Processing",
      description: "Implemented data joining operations, converting producer data to dataframes and executing fraud predictions on the processed data."
    },
    {
      title: "Visualization",
      description: "Completed the pipeline with MongoDB integration, Google Sheets export, and Google Data Studio visualization implementation."
    }
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
                  <Github className="mr-2" size={20} />
                  View Repository
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
              <h2 className="text-2xl font-semibold mb-4">Project Stages</h2>
              <div className="space-y-6">
                {projectDetails.projectStages.map((stage, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4">
                    <p className="text-blue-400 mb-2">Stage {index + 1}: {stage.title}</p>
                    <p className="text-gray-300">{stage.description}</p>
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