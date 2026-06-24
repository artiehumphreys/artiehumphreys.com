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
      {date && <p className="mt-3 text-lg">{date}</p>}
      <p className="mt-3 mb-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-1 text-sm [&_a]:text-blue-600 [&_a]:hover:text-blue-800 dark:[&_a]:text-[#58a6ff] dark:[&_a]:hover:text-[#79c0ff]">
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
    </header>
  );
}
