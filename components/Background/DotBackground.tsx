import React from "react";

interface DotBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function DotBackground({ children, className }: DotBackgroundProps) {
  return (
    <div className={`w-full bg-dot-white/[0.2] relative ${className}`}>
      {children}
    </div>
  );
}
