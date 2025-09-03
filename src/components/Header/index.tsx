"use client";
import React from "react";
import SocialLinks from "./SocialLinks";
import { Menu } from "lucide-react";
import { useSidebar } from "../Sidebar/SidebarProvider";

type TitleProps = {
  title: string;
  author?: string;
  date?: string;
};

export default function Title({
  title,
  author,
  date,
}: TitleProps) {
  const { open, toggle } = useSidebar();
  return (
    <header className="text-center mb-12 font-latex mt-12">
      <div className="fixed left-4 top-4 z-50 hidden lg:block">
        <button
          type="button"
          onClick={toggle}
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          aria-pressed={!!open}
          className="inline-flex items-center justify-center text-gray-700 hover:text-gray-900"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="fixed top-4 right-4 z-50">
        <SocialLinks />
      </div>

      <h1 className="text-4xl font-latex !font-normal">{title}</h1>
      {author && <p className="mt-5 text-lg">{author}</p>}
      {date && <p className="mt-3 text-lg">{date}</p>}
    </header>
  );
}
