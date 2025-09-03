import TableOfContents from "../TableOfContents";
import { useSidebar } from "../Sidebar/SidebarProvider";
import type { TocSection } from "../TableOfContents/types";

interface LeftRailTocProps {
  sections: TocSection[];
}

export default function LeftRailToc({
  sections,
}: LeftRailTocProps) {
  const { open } = useSidebar();
  return (
    <aside className="hidden lg:block">
      <div
        className={[
          "fixed inset-y-0 left-0 z-40",
          open ? "w-72" : "w-0",
        ].join(" ")}
      >
        <div
          className={open ? "h-full px-2 py-4 bg-gray-50" : "h-full px-1 py-4"}
        >
          {open ? (
            <div className="h-full overflow-y-auto pr-1 px-2.5 py-4">
              <TableOfContents
                sections={sections}
                heading={false}
              />
            </div>
          ) : (
            <div className="mx-auto h-full rounded" aria-hidden />
          )}
        </div>
      </div>
    </aside>
  );
}
