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
  id: "ds-4",
  title: "Time Series Prediction using SARIMA for Inventory Optimization",
  category: "data_science",
  fullDescription: "An advanced time series forecasting system designed to enhance operational efficiency and sales performance through data-driven inventory management. This comprehensive project leverages sophisticated statistical modeling techniques, particularly SARIMA (Seasonal AutoRegressive Integrated Moving Average), to provide actionable insights for management decision-making. The system addresses critical business challenges in inventory management by understanding long-term sales trends, identifying patterns that influence sales performance, and delivering robust solutions for inventory optimization challenges.",
  thumbnail: "/images/projects/ds-4.png",
  images: [
    "/images/projects/sarima-main-dashboard.png",
    "/images/projects/sarima-model-performance.png",
    "/images/projects/sarima-seasonal-analysis.png",
    "/images/projects/sarima-forecast-results.png",
    "/images/projects/sarima-business-impact.png"
  ],
  tags: ["Time Series Analysis", "Inventory Optimization", "Statistical Modeling", "Business Intelligence"],
  technologies: [
    "Python 3.9",
    "Statsmodels",
    "SARIMA",
    "Auto ARIMA",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "Seaborn",
    "Plotly",
    "Scikit-learn",
    "Jupyter Notebook",
    "ACF/PACF Analysis",
    "AIC Model Selection",
    "Statistical Testing"
  ],
  demoLink: ".",
  highlights: [
    "Achieved exceptional MAPE of 4% for monthly sales predictions, surpassing the ≤15% target",
    "Reduced stockout incidents by 40% through accurate demand forecasting",
    "Decreased excess inventory by 30%, optimizing working capital efficiency",
    "Implemented SARIMA model with superior seasonal pattern recognition",
    "Developed automated parameter optimization using Auto ARIMA methodology",
    "Created comprehensive seasonal decomposition analysis for 12-month cycles",
    "Established rigorous model validation through Ljung-Box testing",
    "Generated highly accurate and stable forecasts suitable for strategic business decisions",
    "Built scalable forecasting framework for multiple product categories",
    "Delivered measurable ROI through improved inventory turnover rates"
  ],
  duration: "4 months",
  role: "Data Scientist",
  projectStages: [
    {
      title: "Business Problem Definition & Data Understanding",
      description: "Conducted comprehensive analysis of inventory management challenges and operational inefficiencies. Defined clear objectives including achieving MAPE ≤15% for monthly sales predictions and establishing quantifiable business value metrics. Performed extensive exploratory data analysis to understand sales patterns, seasonality, and inventory dynamics across different product categories and time periods."
    },
    {
      title: "Time Series Data Preparation & Preprocessing",
      description: "Implemented robust data preprocessing pipeline including missing value imputation, outlier detection and treatment, and data normalization techniques. Conducted stationarity testing using Augmented Dickey-Fuller tests and applied appropriate transformations. Prepared time series data for modeling by ensuring consistent temporal intervals and handling irregular observations."
    },
    {
      title: "Initial ARIMA Model Development",
      description: "Deployed Auto ARIMA methodology for automated parameter selection and initial model development. Achieved best initial configuration with ARIMA(1,1,1) model yielding AIC value of 950.437. Conducted comprehensive model diagnostics including residual analysis, normality tests, and autocorrelation examination to evaluate baseline model performance."
    },
    {
      title: "Seasonal Pattern Analysis & Identification",
      description: "Performed detailed seasonal decomposition analysis using ACF (AutoCorrelation Function) and PACF (Partial AutoCorrelation Function) plots. Identified significant annual seasonal cycles occurring at 12-month intervals through statistical analysis and visual inspection of historical data trends. Confirmed seasonal patterns through spectral analysis and periodic regression techniques."
    },
    {
      title: "SARIMA Model Implementation & Optimization",
      description: "Developed advanced SARIMA model incorporating seasonal components to address identified 12-month cyclical patterns. Implemented systematic grid search optimization for seasonal parameters (P,D,Q) while maintaining optimal non-seasonal parameters. Conducted extensive hyperparameter tuning to achieve optimal balance between model complexity and predictive accuracy."
    },
    {
      title: "Model Validation & Performance Evaluation",
      description: "Executed rigorous model validation using multiple evaluation metrics including MAPE, MAE, RMSE, and AIC comparison. Performed Ljung-Box testing to validate that residuals exhibit no specific patterns and confirm white noise characteristics. Achieved exceptional MAPE of 4%, significantly exceeding the target threshold of ≤15% for monthly sales predictions."
    },
    {
      title: "Business Impact Analysis & Deployment",
      description: "Implemented comprehensive business impact assessment demonstrating 40% reduction in stockout incidents and 30% decrease in excess inventory. Developed automated forecasting pipeline for continuous model execution and performance monitoring. Created executive dashboards and reporting systems for strategic inventory planning and operational decision-making."
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
              <h2 className="text-xl text-blue-400 mb-2">Advanced Statistical Modeling for Strategic Inventory Management</h2>
              <p className="text-gray-400 text-lg mb-4">{projectDetails.fullDescription}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Model Accuracy</h3>
                  <p className="text-2xl font-bold text-green-400">MAPE: 4%</p>
                  <p className="text-gray-300 text-sm">Exceeding ≤15% target</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-400 mb-2">Stockout Reduction</h3>
                  <p className="text-2xl font-bold text-green-400">40%</p>
                  <p className="text-gray-300 text-sm">Improved availability</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Inventory Optimization</h3>
                  <p className="text-2xl font-bold text-purple-400">30%</p>
                  <p className="text-gray-300 text-sm">Excess inventory reduction</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-orange-400 mb-2">Model Selection</h3>
                  <p className="text-lg font-bold text-orange-400">SARIMA</p>
                  <p className="text-gray-300 text-sm">Seasonal pattern recognition</p>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-400">Model Evolution & Optimization</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-semibold text-gray-300 mb-2">Initial ARIMA Model</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Configuration: ARIMA(1,1,1)</li>
                      <li>• AIC Score: 950.437</li>
                      <li>• Auto ARIMA parameter optimization</li>
                      <li>• Limited seasonal consideration</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-md font-semibold text-gray-300 mb-2">Enhanced SARIMA Model</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Seasonal component integration</li>
                      <li>• 12-month cyclical pattern recognition</li>
                      <li>• ACF/PACF guided optimization</li>
                      <li>• Superior forecasting accuracy</li>
                    </ul>
                  </div>
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
                <span className="mr-2">📈</span>
                Ljung-Box Validated
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

              <h2 className="text-2xl font-semibold mb-4">Technologies & Statistical Methods</h2>
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
                  <div className="flex justify-between">
                    <span className="text-gray-400">Model Type:</span>
                    <span className="text-white">SARIMA</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Development & Implementation Stages</h2>
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