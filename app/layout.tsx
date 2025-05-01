import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Providers } from "./Providers";
import { AnimatedModal } from "@/components/chatbot/Modal";
import { CustomToaster } from "./utils/Toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zi Shen Chan",
  description: "Personal portfolio of Zi Shen Chan",
  icons: {
    icon: "/logo.png",
    apple: "/portfolio-logo-apple.png",
  },
};

export const viewport = {
  width: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <main>
            <CustomToaster />
            {children}
            <AnimatedModal />
          </main>
        </Providers>
      </body>
    </html>
  );
}
