import withMDX from "@next/mdx";
import remarkMath from "remark-math";
import remarkSlug from "remark-slug";
import remarkToc from "remark-toc";
import rehypeKatex from "rehype-katex";
import rehypePrismPlus from "rehype-prism-plus";
import type { NextConfig } from "next";

const mdx = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkMath,
      remarkSlug,
      [remarkToc, {
        heading: "Table of Contents",
        tight: true,
        maxDepth: 3,
      }],
    ],
    rehypePlugins: [rehypeKatex, rehypePrismPlus],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts","tsx","md","mdx"],
};

export default mdx(nextConfig);
