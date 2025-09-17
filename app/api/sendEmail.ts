"use client";

import { envClient } from "@/app/env/client";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { Email } from "@/app/interfaces/Email";

interface sendEmailProps {
  formDetails: string | HTMLFormElement;
}

const sendFormEmail = ({ formDetails }: sendEmailProps) => {
  const sendEmailPromise = emailjs.sendForm(
    envClient.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    envClient.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    formDetails,
    envClient.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  );
  toast.promise(sendEmailPromise, {
    loading: "Sending email...",
    success: "Email sent!",
    error: "Failed to send email",
  });
};

const sendEmail = ({ name, email, title, description }: Email) => {
  const sendEmailPromise = emailjs.send(
    envClient.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    envClient.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    { name, email, title, description },
    envClient.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  );
  toast.promise(sendEmailPromise, {
    loading: "Sending email...",
    success: "Email sent!",
    error: "Failed to send email",
  });
};

export { sendFormEmail, sendEmail };
