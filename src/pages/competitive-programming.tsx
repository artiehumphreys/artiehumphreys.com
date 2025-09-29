import dynamic from "next/dynamic";
import BlogArticle from "@/components/blogArticle";

const Body = dynamic(() => import("@/content/competitive-programming.mdx"));

export default function Page() {
  return (
    <BlogArticle title="Competitive Programming">
      <Body />
    </BlogArticle>
  );
}