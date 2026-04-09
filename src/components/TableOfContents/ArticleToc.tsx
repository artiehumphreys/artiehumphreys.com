import React from "react";
import type { TocSection } from "./types";

interface ArticleTocProps {
  sections: TocSection[];
}

const ArticleToc: React.FC<ArticleTocProps> = ({ sections }) => {
  return (
    <nav aria-label="Table of contents" className="font-latex prose my-4">
      <h2 className="text-3xl font-bold mt-4 mb-4">
        Contents
      </h2>
      <ul className="list-disc pl-7 my-0">
        {sections.map((section) => (
          <li key={section.anchor} className="mb-0.5">
            <a
              href={section.anchor}
              className="text-base hover:underline hover:cursor-pointer"
            >
              {section.title}
            </a>

            {section.children && (
              <ul className="list-disc ml-6 mt-0.5">
                {section.children.map((sub) => (
                  <li key={sub.anchor} className="mb-0.5">
                    <a
                      href={sub.anchor}
                      className="text-small hover:underline hover:cursor-pointer"
                    >
                      {sub.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ArticleToc;
