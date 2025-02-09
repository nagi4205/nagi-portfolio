import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  direction: "up" | "down" | null;
  className?: string;
}

export const AnimatedSection = ({ children, direction, className = "" }: AnimatedSectionProps) => {
  console.log("AnimatedSection", direction);
  const variants = {
    initial: (direction: "up" | "down" | null) => ({
      opacity: 0,
      y: direction === "up" ? -100 : direction === "down" ? 100 : 0,
    }),
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
    exit: (direction: "up" | "down" | null) => ({
      opacity: 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      transition: {
        duration: 1,
        ease: "easeIn",
      },
    }),
  };

  return (
    <motion.div
      className={`section ${className} bg-transparent`}
      custom={direction}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}; 