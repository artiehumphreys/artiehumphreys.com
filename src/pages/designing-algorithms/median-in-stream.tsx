import dynamic from "next/dynamic";
import BlogArticle from "@/components/blogArticle";

const Post = dynamic(() => import("@/content/median-in-stream.mdx"));

export default function Page() {
  return (
    <BlogArticle
      title="Find Median From Data Stream: Two Heap Approach"
      date="10/02/2025"
    >
      <Post />
    </BlogArticle>
  );
}