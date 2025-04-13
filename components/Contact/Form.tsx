"use client";
import React, { useRef } from "react";
import { Label } from "./Label";
import { Input } from "./Input";
import { cn } from "@/app/utils/cn";
import { sendFormEmail } from "@/app/api/sendEmail";

export function Form() {
  const form = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      sendFormEmail({ formDetails: form.current });
    }
  };
  return (
    <div className="shadow-input w-full max-w-lg rounded-non p-4 md:rounded-2xl md:p-8 bg-zinc-800/85 backdrop-blur-md">
      <form className="my-8" onSubmit={handleSubmit} ref={form}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Name*</Label>
          <Input
            name="name"
            id="name"
            // required
            placeholder="Zi Shen"
            type="text"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email*</Label>
          <Input
            name="email"
            id="email"
            // required
            placeholder="zshen2002@gmail.com"
            type="email"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="title">Title*</Label>
          <Input
            name="title"
            id="title"
            placeholder="Input your title"
            // required
            type="text"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="content">Comments</Label>
          <Input
            name="content"
            id="content"
            placeholder="Send some comments"
            type="text"
          />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-zinc-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-500 dark:from-zinc-500 dark:to-zinc-700 backdrop-blur-md dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
          type="submit"
        >
          Send Email &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
