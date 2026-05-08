import { ReactNode } from "react";
import Title from "./Header/index";

type Props = {
  title: string;
  description?: string;
  date?: string | Date;
  className?: string;
  children: ReactNode;
};

function formatDate(d: string | Date | undefined) {
  const date = typeof d === "string" ? new Date(d) : (d ?? new Date());
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogArticle({
  title,
  description,
  date,
  className,
  children,
}: Props) {
  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta name="twitter:title" content={title} />
      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}
      <div className="container mx-auto my-10 px-4 md:px-10 w-full md:w-7/10 font-latex">
        <Title title={title} date={formatDate(date)} />
        <article
          className={`prose mx-auto text-lg [&>h2]:scroll-mt-28 [&>h3]:scroll-mt-28 ${
            className ?? ""
          }`}
        >
          {children}
        </article>
      </div>
    </>
  );
}
