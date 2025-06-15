"use client";
import { saveAs } from "file-saver";

export function ResumeButton() {
  const downloadResume = () => {
    saveAs("/resume.pdf", "zi_shen_chan_resume.pdf");
  };
  return (
    <button
      className="text-xl lg:text-2xl mt-8 underline cursor-pointer"
      onClick={downloadResume}
    >
      Resume
    </button>
  );
}
