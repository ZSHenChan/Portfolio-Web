"use client";

import { cn } from "@/app/utils/cn";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import Icon from "@/public/svg";

interface InfiniteCardInterface {
  items: {
    name: string;
    url: string;
    svgName: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  speed = "fast",
  pauseOnHover = true,
  className,
}: InfiniteCardInterface) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      setStart(true);
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={`${cn(
          " flex min-w-full shrink-0 gap-4 py-1 w-max flex-nowrap",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )} ${start && "animate-scroll"}`}
        style={{
          animation: `scroll 40s ${
            direction === "left" ? "reverse" : "forwards"
          } linear infinite`,
        }}
      >
        {items.map((item) => (
          <li
            className="w-[96px] h-[96px] max-w-full relative rounded-2xl border border-b-0 shrink-0 border-slate-700 px-8 py-6 md:h-[196px] md:w-[196px]"
            style={{
              background:
                "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
            }}
            key={item.name}
          >
            <div
              aria-hidden="true"
              className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
            ></div>
            <div className="h-full grid place-items-center items-center z-20">
              <div className="align-self-end">
                <Image
                  src={item.url}
                  width={64}
                  height={64}
                  alt={`${item.name} icon`}
                />
              </div>
              <div className="hidden md:block text-lg leading-[1.6] text-center text-gray-400 font-normal">
                {item.name}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
