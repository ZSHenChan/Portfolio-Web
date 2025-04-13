import { Lamp } from "@/components/Hero/Lamp";
import { SectionTransition } from "@/components/Hero/SectionTransition";
import { InfiniteMovingCardsGrid } from "@/components/TechGrid/InfiniteMovingCardsGrid";
import { SectionProjects } from "@/components/Projects/SectionProjects";
import { DottedBackground } from "@/components/ui/DottedBackground";
import { SectionContact } from "@/components/Contact/SectionContact";
import { Toaster } from "react-hot-toast";
import { AnimatedModal } from "@/components/chatbot/Modal";

export default function Home() {
  return (
    <main>
      <Toaster
        toastOptions={{
          style: {
            backdropFilter: "--toast-backdrop",
            background: "var(--toast-bg) ",
            color: "var(--toast-text)",
            fontWeight: "bold",
          },
          success: {
            iconTheme: {
              primary: "var(--toast-success-text)",
              secondary: "var(--toast-text)",
            },
            style: {
              backdropFilter: "--toast-backdrop",
              background: "var(--toast-bg) ",
              color: "var(--toast-success-text)",
              fontWeight: "bold",
            },
          },
          error: {
            iconTheme: {
              primary: "var(--toast-error-text)",
              secondary: "var(--toast-text)",
            },
            style: {
              backdropFilter: "--toast-backdrop",
              background: "var(--toast-bg) ",
              color: "var(--toast-error-text)",
              fontWeight: "bold",
            },
          },
          loading: {
            iconTheme: {
              primary: "var(--toast-loading-text)",
              secondary: "var(--toast-bg)",
            },
            style: {
              backdropFilter: "--toast-backdrop",
              background: "var(--toast-loading-bg) ",
              color: "var(--toast-loading-text)",
              fontWeight: "bold",
            },
          },
        }}
      />

      <Lamp></Lamp>
      <SectionTransition />
      <InfiniteMovingCardsGrid />
      <DottedBackground>
        <SectionProjects />
        <SectionContact />
      </DottedBackground>
      <AnimatedModal />
    </main>
  );
}
