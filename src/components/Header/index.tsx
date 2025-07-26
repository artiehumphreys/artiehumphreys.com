import React from "react";

type TitleProps = {
  title: string;
  author?: string;
  date?: string;
};

export default function Title({ title, author, date }: TitleProps) {
  return (
    <header className="text-center mb-12 font-latex mt-10">
      <h1 className="text-4xl font-latex !font-normal">{title}</h1>
      {author && <p className="mt-5 text-lg">{author}</p>}
      {date && <p className="mt-3 text-lg">{date}</p>}
    </header>
  );
}
