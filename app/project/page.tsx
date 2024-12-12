"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  category: "data_science" | "data_engineering" | "data_analytics";
  shortDescription: string;
  thumbnail: string;
  tags: string[];
  demoLink?: string;
}

const projects: Project[] = [
  {
    id: "ds-1",
    title: "NLP Sentiment Analysis: Calon Presiden Indonesia 2024",
    category: "data_science",
    shortDescription: "This project uses Natural Language Processing (NLP) to analyze public sentiments about Indonesias 2024 presidential candidates. Insights from this project help identify public preferences and discussion trends",
    thumbnail: "/images/projects/nlp1.png",
    tags: ["Python", "Scikit-learn", "Natural Language Toolkit (NLTK)", "Feature Engineering"],
    demoLink: "http://159.89.206.165:5003/"
  },
  {
    id: "ds-2",
    title: "Development of a Product Recommendation System Using Web Scraping 10.000+ Data, PySpark, Apache Airflow, and Integration with Llama 3.1",
    category: "data_science",
    shortDescription: "A comprehensive product recommendation system project focused on building similarity-based recommendations using data scraped from padiUMKM platform. The system integrates various technologies including Selenium, BeautifulSoup, PySpark, PostgreSQL, and Llama 3.1 for enhanced contextual recommendations.",
    thumbnail: "/images/projects/ds-2.png",
    tags: ["Selenium",
    "BeautifulSoup",
    "PySpark",
    "PostgreSQL",
    "Apache Airflow",
    "Llama 3.1",
    "Cosine Similarity",
    "Jupyter Notebook",
    "Docker"],
    demoLink: "https://github.com/putuwistika/Project-WebScraping"
  },
  {
    id: "de-1",
    title: "Real-time Data Pipeline",
    category: "data_engineering",
    shortDescription: "Built scalable ETL pipeline processing 1M+ events/day using Apache Kafka and Spark",
    thumbnail: "/images/projects/de1.png",
    tags: ["Apache Kafka", "Spark", "AWS", "Python"],
    demoLink: "https://github.com/example/data-pipeline"
  }
  // {
  //   id: "da-1",
  //   title: "Sales Analytics Dashboard",
  //   category: "data_analytics",
  //   shortDescription: "Interactive dashboard for sales performance analysis with predictive insights",
  //   thumbnail: "/images/projects/sales-dashboard.jpg",
  //   tags: ["Power BI", "SQL", "DAX", "Data Modeling"],
  //   demoLink: "https://powerbi.example.com/sales-dashboard"
  // }
];

const ProjectPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "data_science", label: "Data Science" },
    { id: "data_engineering", label: "Data Engineering" },
    // { id: "data_analytics", label: "Data Analytics" }
  ];

  const filteredProjects = projects.filter(project => 
    selectedCategory === "all" || project.category === selectedCategory
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section className="min-h-screen bg-black text-white pt-32 pb-16"> {/* Hanya mengubah py-16 menjadi pt-32 pb-16 */}
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            My Projects Portfolio
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore my journey through Data Science, Engineering, and Analytics projects
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map(project => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="relative group"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Link href={`/project/${project.id}`}>
                <div className="bg-gray-800 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                  <div className="relative h-48">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                    {hoveredProject === project.id && (
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                        <p className="text-white text-center px-4">Click to view details</p>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.shortDescription}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-gray-700 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm transition-colors duration-300"
                >
                  Demo
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectPage;