import React from "react";
import type { TableOfContentsProps } from "./types";

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections, heading = true }) => {
  return (
    <nav aria-label="Table of contents" className="font-latex prose my-6">
      {heading ? (
        <h2 className="text-3xl font-bold mb-3 pb-2 border-b-2 border-gray-200">
          Contents
        </h2>
      ) : null}
      <ul>
        {sections.map((section, i) => (
          <li key={section.anchor} className="mb-2">
            <a
              href={i == 0 ? `${section.anchor}` : `/wip.html`}
              className="text-base font-bold hover:underline hover:cursor-pointer"
            >
              {i + 1}. {section.title}
            </a>

            {section.children && (
              <ul className="ml-6 mt-1">
                {section.children.map((sub, j) => (
                  <li key={sub.anchor} className="mb-1">
                    <a
                      href={i == 0 ? `${sub.anchor}` : `/wip.html`}
                      className="text-small hover:underline hover:cursor-pointer"
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
