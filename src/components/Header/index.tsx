import HeaderToolbar from "./HeaderToolbar";

export default function Title({
  title,
  author,
  date,
}: {
  title: string;
  author?: string;
  date?: string;
}) {
  return (
    <header className="text-center mb-12 font-latex mt-12">
      <HeaderToolbar />
      <h1 className="text-4xl font-latex !font-normal">{title}</h1>
      {author && <p className="mt-5 text-lg">{author}</p>}
      {date && <p className="mt-3 text-lg">{date}</p>}
    </header>
  );
}
