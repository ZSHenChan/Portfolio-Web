"use client";
import { LinkPreview } from "./LinkPreview";
import { Form } from "./Form";
import { SectionHeading } from "@/components/Headings/SectionHeading";
import { EmailCopy } from "./EmailCopy";

export function SectionContact() {
  return (
    <div className="w-screen">
      <SectionHeading>Contact Me</SectionHeading>
      <div className="w-screen flex flex-row align-center justify-center gap-[10rem] mb-[15rem]">
        <div className="text-xl md:text-3xl flex flex-col justify-around">
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
        <div className="min-w-[25rem]">
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
