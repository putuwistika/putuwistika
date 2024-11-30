"use client";

import { useState, useCallback, useEffect } from "react";
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";

interface ImageDimensions {
  width: number;
  height: number;
}

interface HighlightImage {
  src: string;
  dimensions: ImageDimensions;
}

interface HighlightEvent {
  id: number;
  title: string;
  date: string;
  description: string;
  images: HighlightImage[];
}

const events: HighlightEvent[] = [
  {
    id: 1,
    title: "First ITB Campus Ambassador",
    date: "2022 - Institut Teknologi Bandung, Bandung, Indonesia",
    description: "Selected as one of the first ITB Campus Ambassadors through a rigorous selection process conducted by ITB's Student Affairs Directorate and Ad-Hoc Team (TDD). This role represents the best students who embody ITB's values through AIR (Adaptive - Integrity - Humble) characteristics, serving as the face of ITB's student body.",
    images: [
      {
        src: "/images/highlights/duta_kampus_1.jpg",
        dimensions: { width: 1920, height: 1080 }
      },
      {
        src: "/images/highlights/duta_kampus_2.jpg",
        dimensions: { width: 1600, height: 900 }
      }
    ]
  },
  {
    id: 2,
    title: "Awardee Ganesha Award",
    date: "2021 & 2022 - Institut Teknologi Bandung, Bandung, Indonesia",
    description: "Received the prestigious Ganesha Award, ITB's highest recognition for outstanding student achievements across various fields including Science, Technology, Arts, Talent Development, and Sports. This award represents ITB's appreciation for students who demonstrate exceptional accomplishments in their respective fields.",
    images: [
      {
        src: "/images/highlights/ganesha_award_1.jpg",
        dimensions: { width: 1920, height: 1080 }
      },
      {
        src: "/images/highlights/ganesha_award_2.jpg",
        dimensions: { width: 1600, height: 900 }
      }
    ]
  }
];

const CareerHighlights: React.FC = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const updateWidth = () => {
      const container = document.querySelector('.image-container');
      if (container) {
        setContainerWidth(container.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const calculateImageHeight = (imageDimensions: ImageDimensions, containerWidth: number) => {
    const aspectRatio = imageDimensions.width / imageDimensions.height;
    let finalWidth = containerWidth / 2.5;
    return Math.round(finalWidth / aspectRatio);
  };

  const handleNextEvent = useCallback(() => {
    setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  }, []);

  const handlePrevEvent = useCallback(() => {
    setCurrentEventIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isAutoPlaying) {
      intervalId = setInterval(handleNextEvent, 3000);
    }
    return () => clearInterval(intervalId);
  }, [isAutoPlaying, handleNextEvent]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const currentEvent = events[currentEventIndex];
  const nextEventPreview = events[(currentEventIndex + 1) % events.length];

  return (
    <section className="bg-black text-white pt-32 pb-16">
      <div className="container mx-auto px-4">
        <h4 className="text-sm sm:text-lg font-medium mb-2 sm:mb-4 text-center text-gray-400 font-lato">
          Adaptive. Integrity. Humble.
        </h4>
        <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-8 text-center text-blue-500 font-lato">
          Achievement
        </h2>
        
        <div 
          className="relative mb-6 sm:mb-12"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.button 
            onClick={handlePrevEvent} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 text-3xl text-white opacity-75 hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            &lt;
          </motion.button>
          
          <div className="image-container flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentEventIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="flex gap-1 sm:w-3/4 justify-center items-center"
              >
                {currentEvent.images.map((image, index) => {
                  const imageHeight = containerWidth ? calculateImageHeight(image.dimensions, containerWidth) : 0;
                  
                  return (
                    <motion.div 
                      key={`current-${index}`}
                      className="relative w-1/2 transition-all duration-300 ease-in-out"
                      style={{ height: `${imageHeight}px` }}
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <Image
                        src={image.src}
                        alt={`${currentEvent.title} - Image ${index + 1}`}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-lg"
                        priority={true}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>

              <div className="hidden sm:block w-4" />

              <motion.div 
                className="hidden sm:flex sm:w-1/4 justify-center opacity-50 blur-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.5, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {nextEventPreview.images.slice(0, 1).map((image, index) => {
                  const imageHeight = containerWidth ? calculateImageHeight(image.dimensions, containerWidth) : 0;
                  
                  return (
                    <div 
                      key={`next-${index}`}
                      className="relative w-full transition-all duration-300 ease-in-out"
                      style={{ height: `${imageHeight}px` }}
                    >
                      <Image
                        src={image.src}
                        alt={`${nextEventPreview.title} - Preview`}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-lg"
                      />
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button 
            onClick={handleNextEvent}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 text-3xl text-white opacity-75 hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            &gt;
          </motion.button>
        </div>

        <motion.div 
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl sm:text-2xl font-semibold">{currentEvent.title}</h3>
          <p className="text-xs sm:text-sm mt-2">{currentEvent.date}</p>
          <p className="text-sm sm:text-base mt-4">{currentEvent.description}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default CareerHighlights;