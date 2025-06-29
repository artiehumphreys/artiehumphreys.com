import withMDX from "@next/mdx";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrismPlus from "rehype-prism-plus";
import type { NextConfig } from "next";

const mdx = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypePrismPlus],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts","tsx","md","mdx"],
};

export default mdx(nextConfig);
