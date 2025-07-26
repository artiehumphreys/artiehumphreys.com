import { ReactNode } from "react";
import Title from "./Header/index";
import TableOfContents from "./TableOfContents/index";
import { tocData } from "../data/tocData";

interface HomeProps {
  children: ReactNode;
}

export default function Home({ children }: HomeProps) {
  return (
    <main className="mx-8 my-12">
      <Title
        title="Artie Humphreys' Blog"
        author="Artie Humphreys"
        date="June 29, 2025"
      ></Title>
      <TableOfContents sections={tocData} />
      <article className="prose prose-lg">{children}</article>
    </main>
  );
}
