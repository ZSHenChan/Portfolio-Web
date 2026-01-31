"use client";
import { useState } from "react";
import { saveAs } from "file-saver";
import { cn } from "@/lib/utils";
import { Loader2, X, Code, BarChart, Briefcase, FileText } from "lucide-react";

const RESUME_OPTIONS = [
  { id: "Software Engineering", label: "Software Engineer", icon: Code },
  { id: "Data Analysis", label: "Data Analyst", icon: BarChart },
  { id: "General", label: "General Resume", icon: FileText },
];

export function ResumeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const handleDownload = async (category: string) => {
    if (category == "Software Engineering")
      saveAs("resume/resume_sw.pdf", "zi_shen_chan_resume.pdf");
    else if (category == "Data Analysis")
      saveAs("resume/resume_da.pdf", "zi_shen_chan_resume.pdf");
    else if (category == "General")
      saveAs("resume/resume_ai.pdf", "zi_shen_chan_resume.pdf");

    // try {
    //   setLoading(category);
    //   // 1. Call the Lambda/API endpoint we designed earlier
    //   const response = await fetch("YOUR_API_GATEWAY_URL", {
    //     method: "POST",
    //     body: JSON.stringify({ category }),
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   if (!response.ok) throw new Error("Generation failed");
    //   // 2. Convert response to Blob
    //   const blob = await response.blob();
    //   // 3. Trigger Download
    //   saveAs(blob, `Zi_Shen_Chan_${category.replace(" ", "_")}.docx`);
    //   setIsOpen(false);
    // } catch (error) {
    //   console.error("Resume generation failed:", error);
    //   alert("Failed to generate resume. Please try again.");
    // } finally {
    //   setLoading(null);
    // }
  };

  return (
    <>
      {/* 1. Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-xl lg:text-2xl mt-8 underline cursor-pointer hover:text-slate-300 transition-colors"
      >
        Resume
      </button>

      {/* 2. Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Dialog Content */}
          <div className="relative w-full max-w-md bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
              <h3 className="text-xl font-medium text-slate-200">
                Select Resume Version
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Options Grid */}
            <div className="p-4 grid gap-3">
              {RESUME_OPTIONS.map((option) => {
                const Icon = option.icon;
                const isLoadingThis = loading === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleDownload(option.id)}
                    disabled={!!loading}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg text-left transition-all border border-transparent",
                      "hover:bg-slate-900 hover:border-slate-800 group",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      isLoadingThis && "bg-slate-900 border-slate-800",
                    )}
                  >
                    <div
                      className={cn(
                        "p-2 rounded-md bg-slate-900 text-slate-400 group-hover:text-cyan-400 transition-colors",
                        isLoadingThis && "text-cyan-400",
                      )}
                    >
                      {isLoadingThis ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <div className="font-medium text-slate-200 group-hover:text-white">
                        {option.label}
                      </div>
                      <div className="text-xs text-slate-500">
                        {isLoadingThis
                          ? "Generating with AI..."
                          : "Tailored for this role"}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-900/30 text-center">
              <p className="text-xs text-slate-500">
                Powered by Python Lambda & LLMs
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
