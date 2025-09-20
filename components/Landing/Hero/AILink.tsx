"use client";
import { cn } from "@/lib/utils";
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
        delay: 0,
        duration: 0.4,
        ease: "easeInOut",
      }}
      className={cn(className)}
    >
      AI
    </motion.div>
  );
}
