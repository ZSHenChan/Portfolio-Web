"use client";

import { env } from "@/app/env/client";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { Email } from "@/app/interfaces/Email";

interface sendEmailProps {
  formDetails: string | HTMLFormElement;
}

const sendFormEmail = ({ formDetails }: sendEmailProps) => {
  const sendEmailPromise = emailjs.sendForm(
    env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    formDetails,
    env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  );
  toast.promise(sendEmailPromise, {
    loading: "Sending email...",
    success: "Email sent!",
    error: "Failed to send email",
  });
};

const sendEmail = ({ name, email, title, description }: Email) => {
  const sendEmailPromise = emailjs.send(
    env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    { name, email, title, description },
    env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  );
  toast.promise(sendEmailPromise, {
    loading: "Sending email...",
    success: "Email sent!",
    error: "Failed to send email",
  });
};

export { sendFormEmail, sendEmail };
