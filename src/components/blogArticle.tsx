import { ReactNode } from "react";
import Title from "./Header/index";

type Props = {
  title: string;
  date?: string | Date;
  className?: string;
  children: ReactNode;
};

function formatDate(d: string | Date | undefined) {
  const date = typeof d === "string" ? new Date(d) : d ?? new Date();
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogArticle({
  title,
  date,
  className,
  children,
}: Props) {
  return (
    <div className="container mx-auto my-10 px-0 w-7/10 font-latex">
      <Title title={title} date={formatDate(date)} />
      <article
        className={`prose mx-auto text-lg [&>h2]:scroll-mt-28 [&>h3]:scroll-mt-28 ${
          className ?? ""
        }`}
      >
        {children}
      </article>
    </div>
  );
}
