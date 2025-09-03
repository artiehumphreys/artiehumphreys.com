"use client";

import { useSidebar } from "./SidebarProvider";

export default function SidebarOffset({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open } = useSidebar();
  return (
    <div
      className={`${
        open ? "lg:ml-48" : ""
      }`}
    >
      {children}
    </div>
  );
}
