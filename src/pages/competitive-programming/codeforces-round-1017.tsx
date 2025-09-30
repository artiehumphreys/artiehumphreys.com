import dynamic from "next/dynamic";
import BlogArticle from "@/components/blogArticle";

const Post = dynamic(() => import("@/content/codeforces-round-1017.mdx"));

export default function Page() {
  return (
    <BlogArticle
      title="Codeforces Round 1017 (Div. 4)"
      date="09/29/2025"
    >
      <Post />
    </BlogArticle>
  );
}