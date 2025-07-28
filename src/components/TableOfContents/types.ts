export interface TocSubsection {
  title: string;
  anchor: string;
}

export interface TocSection {
  title: string;
  anchor: string;
  children?: TocSubsection[];
}

export interface TableOfContentsProps {
  sections: TocSection[];
}
