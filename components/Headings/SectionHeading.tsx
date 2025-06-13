"use client";
import { FadeUpInView } from "../ui/FadeUpInView";

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
    <FadeUpInView
      className={`h-[5rem] mb-12 lg:h-[10rem] text-center ${className}`}
    >
      <h2 className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
        {children}
      </h2>
    </FadeUpInView>
  ) : (
    <div className={`text-center ${className}`}>
      <h2 className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
        {children}
      </h2>
    </div>
  );
}
