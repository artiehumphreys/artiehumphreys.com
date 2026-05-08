import dynamic from "next/dynamic";
import BlogArticle from "@/components/blogArticle";

const Post = dynamic(() => import("@/content/rabin-p-cryptosystem.mdx"));

export default function Page() {
  return (
    <BlogArticle
      title="Designing an Efficicient Public-Key Cryptosystem: Rabin-p vs. RSA"
      description="Evaluating the Rabin-p public-key cryptosystem vs. RSA."
      date="12/23/2025"
    >
      <Post />
    </BlogArticle>
  );
}

