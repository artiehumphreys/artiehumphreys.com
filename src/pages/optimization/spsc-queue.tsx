import dynamic from "next/dynamic";
import BlogArticle from "@/components/blogArticle";

const Post = dynamic(() => import("@/content/spsc-queue.mdx"));

export default function Page() {
  return (
    <BlogArticle
      title="Lock-Free Design: Building a High-Performance SPSC Queue"
      date="02/10/2026"
    >
      <Post />
    </BlogArticle>
  );
}
