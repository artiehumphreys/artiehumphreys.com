import { ReactNode } from "react";
import Title from "./Header/index";
import TableOfContents from "./TableOfContents/index";
import { tocData } from "../data/tocData";

interface HomeProps {
  children: ReactNode;
}

export default function Home({ children }: HomeProps) {
  const today = new Date();
  const formattedDate = today.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div className="container mx-auto my-10 w-7/10 font-latex">
      <Title title="Artie Humphreys' Blog" date={formattedDate}></Title>
      <article className="prose mx-auto text-lg">{children}</article>
      <TableOfContents sections={tocData} />
    </div>
  );
}
