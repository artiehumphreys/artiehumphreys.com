import dynamic from "next/dynamic";
import BlogArticle from "@/components/blogArticle";

const Body = dynamic(() => import("@/content/optimization.mdx"));

export default function Page() {
  return (
    <BlogArticle title="Optimization">
      <Body />
    </BlogArticle>
  );
}
