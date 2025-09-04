"use client";

import Link from "next/link";
import { Menu, Home, FolderGit2, Mail, FileText } from "lucide-react";
import { useSidebar } from "../Sidebar/SidebarProvider";

type HeaderToolbarProps = {
  githubHref?: string;
  resumeHref?: string;
  emailHref?: string;
  showLeftOnMobile?: boolean;
};

export default function HeaderToolbar({
  githubHref = "https://github.com/artiehumphreys/artiehumphreys.com",
  resumeHref = "https://artiehumphreys.com/resume.pdf",
  emailHref = "mailto:ah.artiehumphreys@gmail.com",
  showLeftOnMobile = false,
}: HeaderToolbarProps) {
  const { open, toggle } = useSidebar();

  return (
    <>
      <div
        className={[
          "fixed left-4 top-4 z-50",
          showLeftOnMobile ? "flex" : "hidden lg:flex",
          "items-center space-x-4",
        ].join(" ")}
      >
        <button
          type="button"
          onClick={toggle}
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          aria-pressed={!!open}
          className="inline-flex items-center justify-center text-gray-700 hover:text-gray-900"
        >
          <Menu size={24} />
        </button>

        <Link
          href="/"
          aria-label="Home"
          className="inline-flex items-center justify-center text-gray-700 hover:text-gray-900"
        >
          <Home size={24} />
        </Link>
      </div>

      <div className="fixed top-4 right-4 z-50 flex items-center space-x-4">
        <a
          href={githubHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="inline-flex items-center justify-center text-gray-700 hover:text-gray-900"
        >
          <FolderGit2 size={24} />
        </a>

        <Link
          href={resumeHref}
          aria-label="Resume"
          className="inline-flex items-center justify-center text-gray-700 hover:text-gray-900"
        >
          <FileText size={24} />
        </Link>

        <a
          href={emailHref}
          aria-label="Email"
          className="inline-flex items-center justify-center text-gray-700 hover:text-gray-900"
        >
          <Mail size={24} />
        </a>
      </div>
    </>
  );
}
