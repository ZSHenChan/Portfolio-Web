"use client";
import { motion } from "framer-motion";

export function SectionHeading({
  children,
  className,
  animation = true,
}: {
  children: React.ReactNode | string;
  className?: string;
  animation?: boolean;
}) {
  return animation ? (
    <div className={`h-[10rem] text-center ${className}`}>
      <motion.h2
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 50 }}
        transition={{
          delay: 0.1,
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl"
      >
        {children}
      </motion.h2>
    </div>
  ) : (
    <div className={`text-center ${className}`}>
      <h2 className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
        {children}
      </h2>
    </div>
  );
}
