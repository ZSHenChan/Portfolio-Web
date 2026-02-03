"use client";
import { useState } from "react";
import { saveAs } from "file-saver";
import { cn } from "@/lib/utils";
import { Loader2, X, Sparkles, ArrowLeft } from "lucide-react";
import { generateResume } from "@/lib/docx";
import { fetchResumeData } from "@/app/lib/chatbot/fetchCustomizedResume";
import { ResumeOption } from "@/app/interfaces/Resume";
import { RESUME_OPTIONS } from "@/app/lib/chatbot/config";
import toast from "react-hot-toast";

export function ResumeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const [showCustomInput, setShowCustomInput] = useState(false);
  const [jobDescription, setJobDescription] = useState("");

  const handleStaticDownload = (option: ResumeOption) => {
    saveAs(option.filename, option.downloadFilename);

    setIsOpen(false);
  };

  const handleCustomGeneration = async () => {
    if (!jobDescription.trim()) return;

    try {
      setLoading("Custom");

      const customized_data = await toast.promise(
        fetchResumeData(jobDescription),
        {
          loading: "Fetching and processing required data...",
          success: "Got it!",
          error: "Fetching failed. Please try again later.",
        },
      );
      if (!customized_data) return;

      const blob = await generateResume(customized_data);

      saveAs(blob, `zi_shen_chan_custom_resume.docx`);
      setIsOpen(false);

      setShowCustomInput(false);
      setJobDescription("");
    } catch (error) {
      console.error("Resume generation failed:", error);
    } finally {
      setLoading(null);
    }
  };

  const handleOptionClick = (option: ResumeOption) => {
    if (option.id === "Custom") {
      setShowCustomInput(true);
    } else {
      handleStaticDownload(option);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xl lg:text-2xl mt-8 underline cursor-pointer hover:text-slate-300 transition-colors"
      >
        Resume
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-md bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
              <div className="flex items-center gap-2">
                {showCustomInput && (
                  <button
                    onClick={() => setShowCustomInput(false)}
                    className="mr-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <h3 className="text-xl font-medium text-slate-200">
                  {showCustomInput
                    ? "Paste Job Description"
                    : "Select Resume Version"}
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4">
              {!showCustomInput ? (
                // 1. STANDARD OPTIONS LIST
                <div className="grid gap-3">
                  {RESUME_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleOptionClick(option)}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-lg text-left transition-all border border-transparent",
                          "hover:bg-slate-900 hover:border-slate-800 group",
                        )}
                      >
                        <div className="p-2 rounded-md bg-slate-900 text-slate-400 group-hover:text-cyan-400 transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-200 group-hover:text-white">
                            {option.label}
                          </div>
                          <div className="text-xs text-slate-500">
                            {option.text}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                // 2. CUSTOM INPUT FORM
                <div className="space-y-4 animate-in slide-in-from-right-10 duration-200">
                  <div className="relative">
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the job description or role requirements here..."
                      className="w-full h-40 p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none text-sm"
                      disabled={loading === "Custom"}
                    />
                  </div>

                  <button
                    onClick={handleCustomGeneration}
                    disabled={!jobDescription.trim() || loading === "Custom"}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all",
                      "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white",
                      "disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale",
                    )}
                  >
                    {loading === "Custom" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating Custom Resume...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate with AI
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-900/30 text-center border-t border-slate-800">
              <p className="text-xs text-slate-500">
                {showCustomInput
                  ? "AI will analyze requirements to highlight your best matching skills"
                  : "Powered by Docx & Gemini"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
