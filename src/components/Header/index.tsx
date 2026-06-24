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
    <header className="text-center mb-8 font-latex mt-12">
      <HeaderToolbar />
      <h1 className="text-4xl font-latex !font-normal">{title}</h1>
      {author && <p className="mt-5 text-lg">{author}</p>}
      <p className="mt-3 flex flex-wrap items-center justify-center gap-x-10 gap-y-1 text-sm [&_a]:underline [&_a]:underline-offset-2">
        <a
          href="https://artiehumphreys.com/resume"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>
        <a
          href="https://codeforces.com/profile/artiehumphreys"
          target="_blank"
          rel="noopener noreferrer"
        >
          Codeforces
        </a>
        <a href="mailto:ah.artiehumphreys@gmail.com">Email</a>
        <a
          href="https://github.com/artiehumphreys/artiehumphreys.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </p>
      {date && <p className="mt-3 text-lg">{date}</p>}
    </header>
  );
}
