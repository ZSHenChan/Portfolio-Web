"use client";
import { motion } from "motion/react";

export function FadeUpInView({
  children,
  className,
  initialOpacity = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  initialOpacity?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: initialOpacity, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1,
        duration: 0.5,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
