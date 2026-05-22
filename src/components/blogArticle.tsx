import { ReactNode } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Title from "./Header/index";

const SITE_URL = "https://artiehumphreys.com";

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
  const router = useRouter();
  const path = router.pathname;
  const canonical = `${SITE_URL}${path}.html`;
  const ogImage = `${SITE_URL}/og${path}.png`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={ogImage} />
        {description && (
          <>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta name="twitter:description" content={description} />
          </>
        )}
      </Head>
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
