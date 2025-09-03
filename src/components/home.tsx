import { ReactNode } from "react";
import Title from "./Header";
import TableOfContents from "./TableOfContents";
import { tocData } from "../data/tocData";

interface HomeProps {
  children: ReactNode;
}

export default function Home({ children }: HomeProps) {
  const formattedDate = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="container mx-auto my-10 px-0 w-7/10 font-latex">
      <Title title="Artie Humphreys' Blog" date={formattedDate} />

      <article className="prose mx-auto text-lg [&>h2]:scroll-mt-28 [&>h3]:scroll-mt-28">
        {children}
      </article>

      <TableOfContents sections={tocData} />
    </div>
  );
}
