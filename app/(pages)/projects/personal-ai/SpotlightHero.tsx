"use client";

import React from "react";
import { Spotlight } from "@/components/ui/Spotlight";
import { ScrollableSection } from "@/components/layout/ScrollableSection";

export function SpotlightHero({ id }: { id: string }) {
  return (
    <ScrollableSection
      id={id}
      className="relative flex h-screen w-screen overflow-hidden rounded-md antialiased place-items-center md:items-center md:justify-center"
    >
      <Spotlight
        className="top-30 -left-20 md:top-10 md:-left-10 lg:top-[10dvh] lg:left-[20%]"
        fill="white"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-slate-50 to-slate-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          Meet My Personal <br /> AI Assistant
        </h1>
        <p className="mx-auto mt-4 mb-8 max-w-lg text-center text-base font-normal text-neutral-300">
          Explore my portfolio interactively! This AI assistant can answer your
          questions about my skills and projects, or even help you get in touch
          and navigate the website.
        </p>
        <a
          className="block mx-auto max-w-lg text-center text-base font-bold underline text-neutral-300"
          href="#why"
        >
          Start Exploring
        </a>
      </div>
    </ScrollableSection>
  );
}
