import dynamic from "next/dynamic";
import BlogArticle from "@/components/blogArticle";

const Post = dynamic(() => import("@/content/particle-simulation.mdx"));

export default function Page() {
  return (
    <BlogArticle
      title="Particle Simulation: Improving Performance by 10x"
      date="08/30/2025"
    >
      <Post />
    </BlogArticle>
  );
}
