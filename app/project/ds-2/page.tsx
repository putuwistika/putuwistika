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
  id: "ds-2",
  title: "Development of a Product Recommendation System Using Web Scraping 10.000+ Data, PySpark, Apache Airflow, and Integration with Llama 3.1",
  category: "data_science",
  fullDescription: "A comprehensive product recommendation system project focused on building similarity-based recommendations using data scraped from padiUMKM platform. The system integrates various technologies including Selenium, BeautifulSoup, PySpark, PostgreSQL, and Llama 3.1 for enhanced contextual recommendations.",
  thumbnail: "/images/projects/ds-2.png",
  images: [
    "/images/projects/ds-2.png",
  ],
  tags: ["Web Scraping", "PySpark", "Llama 3.1", "PostgreSQL"],
  technologies: [
    "Python 3.12.2",
    "Selenium",
    "BeautifulSoup",
    "PySpark",
    "PostgreSQL",
    "Apache Airflow",
    "Llama 3.1",
    "Cosine Similarity",
    "Jupyter Notebook",
    "Docker"
  ],
  demoLink: "https://github.com/putuwistika/Project-WebScraping",
  highlights: [
    "Scraped over 100,000 product entries using Selenium and BeautifulSoup",
    "Implemented data transformation and cleaning using PySpark",
    "Developed similarity-based recommendation system with Cosine Similarity",
    "Integrated Llama 3.1 for enhanced contextual recommendations",
    "Built real-time recommendation service with continuous data updates"
  ],
  duration: "4 months",
  role: "Data Scientist",
  projectStages: [
    {
      title: "Web Scraping",
      description: "Developed automated scraping system using Selenium and BeautifulSoup to collect product data including names, prices, stock, sales, ratings, descriptions, dimensions, and weights from padiUMKM platform."
    },
    {
      title: "Data Processing",
      description: "Implemented data transformation pipeline using PySpark for consistency checking, normalization, and data cleansing. Established PostgreSQL database connection for data storage."
    },
    {
      title: "Recommendation Model",
      description: "Built similarity-based recommendation system using Cosine Similarity algorithm, utilizing product descriptions and features like categories, brands, and related attributes."
    },
    {
      title: "LLM Integration",
      description: "Integrated Llama 3.1 model through prompt engineering techniques to enhance recommendation quality by understanding linguistic patterns in product descriptions."
    },
    {
      title: "Real-time System",
      description: "Developed real-time data collection and transformation processes, implemented recommendation model as a real-time service for immediate product suggestions."
    },
    {
      title: "Testing & Optimization",
      description: "Conducted comprehensive testing of the recommendation system, optimized model performance, and validated recommendation accuracy."
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
      <div className="relative h-96 rounded-xl overflow-hidden group">
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

          <ImageCarousel images={projectDetails.images} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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