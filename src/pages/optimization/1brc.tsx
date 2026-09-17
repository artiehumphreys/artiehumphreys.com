import dynamic from "next/dynamic";
import BlogArticle from "@/components/blogArticle";

const Post = dynamic(() => import("@/content/1brc.mdx"));

export default function Page() {
  return (
    <BlogArticle
      title="1 Billion Row Challenge"
      description="Parsing a billion rows with vectorization."
      date="09/16/2026"
    >
      <Post />
    </BlogArticle>
  );
}
