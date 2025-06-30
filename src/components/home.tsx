import { ReactNode } from "react";
import Title from "./title";

interface HomeProps {
  children: ReactNode;
}

export default function Home({ children }: HomeProps) {
  return (
    <main className="mx-auto my-12">
      <Title
        title="Artie Humphreys' Blog"
        author="Artie Humphreys"
        date="June 29, 2025"
      ></Title>
      <article className="prose prose-lg">{children}</article>
    </main>
  );
}
