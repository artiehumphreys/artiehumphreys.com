import type { ReactNode } from "react";

export default function Revisit({ children }: { children: ReactNode }) {
  return (
    <span className="border-b border-dashed border-amber-500/70">
      {children}
    </span>
  );
}
