import { ReactNode } from "react";

export default function MainContent({ children }: { children: ReactNode }) {
  return (
    <main
      style={{
        flex: 1,
        display: "flex",
        maxWidth: "100vw",
        overflow: "hidden",
      }}
    >
      {children}
    </main>
  );
}
