"use client";

import React from "react";
import { motion } from "motion/react";

export const AnimatedToggleButton = ({
  text,
  isOn,
  setIsOn,
}: {
  text: string;
  isOn: boolean;
  setIsOn: (open: boolean) => void;
}) => {
  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <div className="flex flex-col items-center justify-center ">
      <motion.button
        className={`w-[40px] h-[20px] rounded-[25px] flex p-[2px] cursor-pointer`}
        style={{
          justifyContent: "flex-" + (isOn ? "end" : "start"),
        }}
        onClick={toggleSwitch}
        animate={{
          backgroundColor: isOn ? "#1f2937" : "#e2e8f0",
        }}
      >
        <motion.div
          className="w-[16px] h-full bg-white/80 rounded-[25px]"
          layout
          transition={{
            type: "spring",
            visualDuration: 0.3,
            bounce: 0.2,
          }}
          animate={{
            backgroundColor: isOn ? "#e2e8f0" : "#1f2937",
          }}
        />
      </motion.button>
      <p className="text-xs text-slate-300">{text}</p>
    </div>
  );
};
