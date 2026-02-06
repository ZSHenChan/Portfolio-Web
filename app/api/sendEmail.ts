"use client";

import { envClient } from "@/app/env/client";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { Email } from "@/app/interfaces/Email";
import purify from "dompurify";

interface sendEmailProps {
  formDetails: HTMLFormElement;
}

const sendFormEmail = ({ formDetails }: sendEmailProps) => {
  const formData = new FormData(formDetails);

  const templateParams: Record<string, unknown> = {};

  formData.forEach((value, key) => {
    if (typeof value === "string") {
      templateParams[key] = purify.sanitize(value);
    } else {
      templateParams[key] = value;
    }
  });

  const sendEmailPromise = emailjs.send(
    envClient.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    envClient.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    templateParams,
    envClient.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  );
  toast.promise(sendEmailPromise, {
    loading: "Sending email...",
    success: "Email sent!",
    error: "Failed to send email",
  });
};

const sendEmail = ({ name, email, title, description }: Email) => {
  const sanitizedDescription = purify.sanitize(description ?? "");
  const sanitizedTitle = purify.sanitize(title);
  const sanitizedName = purify.sanitize(name);

  const sendEmailPromise = emailjs.send(
    envClient.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    envClient.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    { sanitizedName, email, sanitizedTitle, sanitizedDescription },
    envClient.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  );
  toast.promise(sendEmailPromise, {
    loading: "Sending email...",
    success: "Email sent!",
    error: "Failed to send email",
  });
};

export { sendFormEmail, sendEmail };
