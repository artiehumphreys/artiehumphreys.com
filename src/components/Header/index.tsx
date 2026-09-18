import HeaderToolbar from "./HeaderToolbar";
import Links from "./links";

export default function Title({
  title,
  author,
  date,
  isHome = false,
}: {
  title: string;
  author?: string;
  date?: string;
  isHome?: boolean;
}) {
  const links = isHome ? <Links /> : "";
  return (
    <header className="text-center mb-8 font-latex mt-12">
      <HeaderToolbar />
      <h1 className="text-4xl font-latex !font-normal">{title}</h1>
      {author && <p className="mt-5 text-lg">{author}</p>}
      {date && <p className="mt-3 text-lg">{date}</p>}
      {links}
    </header>
  );
}
