"use client";

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ExternalHyperlink,
  HeadingLevel,
  AlignmentType,
  TabStopType,
  BorderStyle,
  convertInchesToTwip,
} from "docx";
import { ResumeEntry, FinalResumeData } from "@/app/interfaces/Resume";

const parseRichText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return new TextRun({
        text: part.slice(2, -2),
        bold: true,
        font: "Times New Roman",
      });
    }
    return new TextRun({ text: part, font: "Times New Roman" });
  });
};

const createSectionTitle = (title: string) => {
  return new Paragraph({
    text: title.toUpperCase(),
    heading: HeadingLevel.HEADING_1,
    border: {
      bottom: {
        color: "auto",
        space: 1,
        style: BorderStyle.SINGLE,
        size: 6,
      },
    },
    spacing: { before: 200, after: 40 },
    run: {
      font: "Times New Roman",
      bold: true,
      size: 18,
      color: "1F4E79", // RGB(31, 78, 121)
    },
  });
};

const createSubheading = (leftText: string, rightDate: string) => {
  return new Paragraph({
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: convertInchesToTwip(7.3),
      },
    ],
    children: [
      new TextRun({
        text: leftText,
        bold: true,
        font: "Times New Roman",
      }),
      new TextRun({
        text: `\t${rightDate}`,
        font: "Times New Roman",
      }),
    ],
  });
};

const createSection = (sectionTitle: string, entries: ResumeEntry[]) => {
  return [
    createSectionTitle(sectionTitle),

    ...entries.flatMap((entry) => {
      const headerText = entry.role
        ? `${entry.title} | ${entry.role}`
        : entry.title;

      return [
        createSubheading(headerText, entry.date),

        ...entry.bullets.map(
          (bullet) =>
            new Paragraph({
              bullet: { level: 0 },
              children: parseRichText(bullet),
              spacing: { after: 50 },
            }),
        ),

        new Paragraph({ spacing: { after: 100 } }),
      ];
    }),
  ];
};

// --- MAIN GENERATOR FUNCTION ---
export const generateResume = async (resumeData: FinalResumeData) => {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Times New Roman",
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.5),
              bottom: convertInchesToTwip(0.5),
              left: convertInchesToTwip(0.5),
              right: convertInchesToTwip(0.5),
            },
          },
        },
        children: [
          // --- HEADER ---
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: resumeData.header.name,
                bold: true,
                size: 40,
              }),
            ], // 20pt
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun(resumeData.header.contact)],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: resumeData.header.links.flatMap((link, index) => [
              new TextRun({ text: `${link.label}: ` }),
              new ExternalHyperlink({
                children: [
                  new TextRun({
                    text: link.text,
                    style: "Hyperlink",
                    color: "0000FF",
                    underline: { type: "single" },
                  }),
                ],
                link: link.url,
              }),
              index < resumeData.header.links.length - 1
                ? new TextRun(" | ")
                : new TextRun(""),
            ]),
          }),

          // --- SUMMARY ---
          createSectionTitle("Summary"),
          new Paragraph({ children: [new TextRun(resumeData.summary)] }),

          // --- EDUCATION ---
          createSectionTitle("Education"),
          ...resumeData.education.flatMap((edu) => [
            createSubheading(edu.institution, edu.date),
            new Paragraph({ text: edu.degree }),
            new Paragraph({ text: edu.gpa }),
          ]),

          // --- EXPERIENCE ---
          ...createSection(
            "Work Experiences & Internships",
            resumeData["Work Experiences & Internships"],
          ),
          ...createSection(
            "Personal Projects",
            resumeData["Personal Projects"],
          ),
          ...createSection(
            "Leadership Experiences",
            resumeData["Leadership Experiences"],
          ),

          // --- SKILLS (Miscellaneous) ---
          createSectionTitle("Miscellaneous"),
          ...Object.entries(resumeData.skills).map(
            ([key, value]) =>
              new Paragraph({
                children: [
                  new TextRun({ text: `${key}: `, bold: true }),
                  new TextRun(value),
                ],
              }),
          ),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  return blob;
};
