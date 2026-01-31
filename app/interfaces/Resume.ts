import { LucideIcon } from "lucide-react";

export interface ResumeEntry {
  title: string;
  role: string;
  date: string;
  bullets: string[];
}

export interface SkillsData {
  "Technical": string;
  "Soft Skills": string;
  "Interests": string;
}

export interface HeaderLink {
  label: string;
  text: string;
  url: string;
}

export interface HeaderData {
  name: string;
  contact: string;
  links: HeaderLink[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  gpa: string;
  date: string;
}

// --- Main Interface ---
export interface FinalResumeData {
  header: HeaderData;
  education: EducationEntry[];
  summary: string;
  "Work Experiences & Internships": ResumeEntry[];
  "Personal Projects": ResumeEntry[];
  "Leadership Experiences": ResumeEntry[];
  skills: SkillsData;
}

export interface ResumeOption {
  id: string;
  label: string;
  icon: LucideIcon;
  text: string;
  filename: string;
  downloadFilename: string;
}
