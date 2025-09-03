"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Ctx = {
  open: boolean;
  toggle: () => void;
  set: (v: boolean) => void;
};

const SidebarContext = createContext<Ctx | null>(null);

export function SidebarProvider({
  children,
  defaultOpen = true,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    const v =
      typeof window !== "undefined"
        ? localStorage.getItem("ah.sidebarOpen")
        : null;
    if (v !== null) setOpen(v === "1");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ah.sidebarOpen", open ? "1" : "0");
    }
  }, [open]);

  const value = useMemo<Ctx>(
    () => ({ open, toggle: () => setOpen((o) => !o), set: setOpen }),
    [open]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within <SidebarProvider>");
  return ctx;
}
