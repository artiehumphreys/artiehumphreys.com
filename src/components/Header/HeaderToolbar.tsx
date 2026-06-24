"use client";

import Link from "next/link";
import { Menu, Home } from "lucide-react";
import { useSidebar } from "../Sidebar/SidebarProvider";

type HeaderToolbarProps = {
  showLeftOnMobile?: boolean;
};

export default function HeaderToolbar({
  showLeftOnMobile = false,
}: HeaderToolbarProps) {
  const { open, toggle } = useSidebar();
  const iconSize = 24;
  return (
    <>
      <div className="fixed left-4 top-4 z-50 flex items-center space-x-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          aria-pressed={!!open}
          className={`${
            showLeftOnMobile ? "inline-flex" : "hidden lg:inline-flex"
          } items-center justify-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100`}
        >
          <Menu size={iconSize} />
        </button>

        <Link
          href="/"
          aria-label="Home"
          className="inline-flex items-center justify-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
        >
          <Home size={iconSize} />
        </Link>
      </div>
    </>
  );
}
