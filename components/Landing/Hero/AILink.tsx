"use client";
import { motion } from "motion/react";

export function AILink({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{
        // color: "#fff",
        background: "linear-gradient(to bottom right, #cbd5e1, #64748b)",
        // color: "transparent",
        backgroundClip: "text",
      }}
      whileInView={{
        background: "linear-gradient(to bottom right, #fbbf24, #f87171)", // yellow to red
      }}
      viewport={{ once: true }}
      transition={{
        delay: 1,
        duration: 1,
        ease: "easeInOut",
      }}
      className={className}
    >
      AI
    </motion.div>
  );
}
