"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface BlurInProps {
  word: string;
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
  size?: string; // New prop for text size
}
const BlurIn = ({ word, className, variant, duration = 1.5, size = "text-4xl" }: BlurInProps) => {
  const defaultVariants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.h2
      initial="hidden"
      animate="visible"
      transition={{ duration }}
      variants={combinedVariants}
      className={cn(
        `font-display text-center font-bold tracking-[-0.02em] drop-shadow-sm ${size}`,
        className,
      )}
    >
      {word}
    </motion.h2>
  );
};

export default BlurIn;