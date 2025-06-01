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
  id: "ds-3",
  title: "Churn Prediction: Turning Churn into Opportunity",
  category: "data_science",
  fullDescription: "A comprehensive customer churn prediction system designed to transform customer retention strategies for e-commerce businesses. This data-driven solution leverages advanced machine learning techniques to identify at-risk customers and provide actionable insights for retention campaigns. The project focuses on becoming a top customer-centric e-commerce leader by reducing customer churn, minimizing revenue losses, enhancing retention strategies, and ensuring consistent business growth while maintaining high customer satisfaction levels.",
  thumbnail: "/images/projects/ds-3.png",
  images: [
    "/images/projects/churn-prediction-main.png",
    "/images/projects/churn-model-performance.png",
    "/images/projects/churn-dashboard.png",
    "/images/projects/churn-deployment.png"
  ],
  tags: ["Customer Retention", "Machine Learning", "Business Intelligence", "Predictive Analytics"],
  technologies: [
    "Python 3.10",
    "Scikit-learn",
    "Support Vector Machine (SVM)",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "Seaborn",
    "Node.js",
    "Express.js",
    "REST API",
    "PostgreSQL",
    "Docker",
    "Jupyter Notebook"
  ],
  demoLink: "https://github.com/putuwistika/Project-BliData",
  highlights: [
    "Achieved 69% reduction in customer churn rate, exceeding the target objective",
    "Implemented Support Vector Machine (SVM) model with F-2 score of 0.86",
    "Developed real-time churn prediction system with Node.js deployment",
    "Created comprehensive customer retention strategy framework",
    "Established automated early warning system for at-risk customers",
    "Generated actionable business insights for proactive customer engagement",
    "Delivered measurable ROI through reduced customer acquisition costs",
    "Built scalable solution suitable for enterprise-level implementation"
  ],
  duration: "5 months",
  role: "Data Scientist",
  projectStages: [
    {
      title: "Business Problem Analysis",
      description: "Conducted comprehensive analysis of customer churn patterns and business impact. Defined key performance indicators including target churn reduction of ≥69% and retention rate improvement to ≥31%. Established project scope focusing on e-commerce customer lifecycle management and revenue protection strategies."
    },
    {
      title: "Data Collection & Exploration",
      description: "Gathered extensive customer behavioral data including transaction history, engagement metrics, demographic information, and support interactions. Performed exploratory data analysis to identify churn indicators and customer segmentation patterns. Conducted statistical analysis to understand feature correlations and business drivers."
    },
    {
      title: "Feature Engineering & Preprocessing",
      description: "Developed sophisticated feature engineering pipeline including customer lifetime value calculations, recency-frequency-monetary (RFM) analysis, behavioral scoring, and engagement trend analysis. Implemented data preprocessing techniques including normalization, handling missing values, and outlier detection to ensure model robustness."
    },
    {
      title: "Model Development & Selection",
      description: "Evaluated multiple machine learning algorithms including Random Forest, Gradient Boosting, Logistic Regression, and Support Vector Machine. Selected SVM for its superior stability, lower overfitting risk, and consistent performance across different customer segments. Optimized hyperparameters using grid search and cross-validation techniques."
    },
    {
      title: "Model Validation & Performance Optimization",
      description: "Conducted rigorous model validation using stratified k-fold cross-validation and temporal validation techniques. Achieved F-2 score of 0.86, prioritizing recall to minimize false negatives in churn detection. Implemented comprehensive performance monitoring including precision, recall, accuracy, and business impact metrics."
    },
    {
      title: "Deployment & Real-time Integration",
      description: "Developed production-ready churn prediction service using Node.js and Express.js framework. Created RESTful API endpoints for real-time churn scoring and batch prediction capabilities. Implemented automated model monitoring and alert systems for continuous performance tracking and model drift detection."
    },
    {
      title: "Business Impact & Continuous Improvement",
      description: "Established feedback loops with business stakeholders to measure retention campaign effectiveness. Implemented A/B testing framework to validate intervention strategies. Created comprehensive reporting dashboard for executive visibility and strategic decision-making. Developed model retraining pipeline for continuous improvement."
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
            
            <div className="mb-6">
              <h2 className="text-xl text-blue-400 mb-2">Data-Driven Insights on Retaining E-commerce Customers</h2>
              <p className="text-gray-400 text-lg mb-4">{projectDetails.fullDescription}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Project Goal</h3>
                  <p className="text-gray-300 text-sm">Become a top customer-centric e-commerce leader by reducing customer churn, minimizing revenue losses, and ensuring consistent growth.</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-400 mb-2">Key Achievement</h3>
                  <p className="text-gray-300 text-sm">Successfully reduced customer churn by ≥69% with retention rate of ≥31% through advanced ML techniques.</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Model Performance</h3>
                  <p className="text-gray-300 text-sm">SVM model achieving F-2 score of 0.86 with superior stability and lower overfitting risk.</p>
                </div>
              </div>
            </div>
            
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
              <motion.div
                className="inline-flex items-center px-6 py-3 bg-gray-800 rounded-lg text-gray-300"
                whileHover={{ scale: 1.05 }}
              >
                <span className="mr-2">📊</span>
                F-2 Score: 0.86
              </motion.div>
            </div>
          </div>

          <ImageCarousel images={projectDetails.images} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Project Highlights</h2>
              <ul className="space-y-2 mb-8">
                {projectDetails.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold mb-4">Technologies & Tools</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {projectDetails.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 border border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-400">Project Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white">{projectDetails.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Role:</span>
                    <span className="text-white">{projectDetails.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-white capitalize">{projectDetails.category.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Project Development Stages</h2>
              <div className="space-y-6">
                {projectDetails.projectStages.map((stage, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center mb-2">
                      <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </span>
                      <h4 className="text-blue-400 font-semibold">{stage.title}</h4>
                    </div>
                    <p className="text-gray-300 ml-11">{stage.description}</p>
                  </motion.div>
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