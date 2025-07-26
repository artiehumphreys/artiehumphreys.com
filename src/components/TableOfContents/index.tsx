import React from "react";
import type { TableOfContentsProps } from "./types";

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections }) => {
  return (
    <nav aria-label="Table of contents" className="font-latex prose my-8">
      <h2 className="text-2xl font-bold mb-4">Contents</h2>
      <ul>
        {sections.map((section, i) => (
          <li key={section.anchor} className="mb-2">
            <a
              href={`/${section.anchor}`}
              className="text-base font-bold hover:underline hover:cursor-pointer"
            >
              {i + 1}. {section.title}
            </a>

            {section.children && (
              <ul className="ml-6 mt-1">
                {section.children.map((sub, j) => (
                  <li key={sub.anchor} className="mb-1">
                    <a
                      href={`/${sub.anchor}`}
                      className="text-sm hover:underline hover:cursor-pointer"
                    >
                      {i + 1}.{j + 1} {sub.title}
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

export default TableOfContents;
