import { Toaster } from "react-hot-toast";

export function CustomToaster() {
  return (
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
  );
}
