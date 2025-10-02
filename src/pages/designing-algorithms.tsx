import dynamic from "next/dynamic";
import BlogArticle from "@/components/blogArticle";

const Body = dynamic(() => import("@/content/designing-algorithms.mdx"));

export default function Page() {
  return (
    <BlogArticle title="Designing Algorithms">
      <Body />
    </BlogArticle>
  );
}