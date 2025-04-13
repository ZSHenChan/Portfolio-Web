"use client";
import { useRef } from "react";
import { LinkPreview } from "./LinkPreview";
import { Form } from "./Form";
import { SectionHeading } from "@/components/Headings/SectionHeading";
import { EmailCopy } from "./EmailCopy";
import { useRefs } from "@/app/context/RefsContext";
import { useEffect } from "react";

export function SectionContact() {
  const { registerRef } = useRefs();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    registerRef("contact", sectionRef.current);
  }, [registerRef, sectionRef]);

  return (
    <div ref={sectionRef} className="w-full mt-[8rem]" id="contact-section">
      <SectionHeading>Contact Me</SectionHeading>
      <div className="flex flex-col md:flex-row align-center place-items-center justify-center gap-[10dvw] mb-[15rem]">
        <div className="text-xl md:text-3xl flex flex-row md:flex-col justify-around items-center gap-[10dvw]">
          <LinkPreview url="https://github.com/ZSHenChan" className="font-bold">
            GitHub
          </LinkPreview>
          <LinkPreview
            url="https://www.linkedin.com/in/zi-shen-chan/"
            className="font-bold"
          >
            LinkedIn
          </LinkPreview>
          <EmailCopy />
        </div>
        <div className="min-w-[90%] md:min-w-[25rem]">
          <div className="items-center justify-center">
            <h3 className="text-lg text-center mb-[1rem] text-zinc-400">
              Or simply fill out this form
            </h3>
          </div>
          <Form />
        </div>
      </div>
    </div>
  );
}
