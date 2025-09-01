import withMDX from "@next/mdx";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import type { NextConfig } from "next";

const mdx = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: { className: ["anchor-link"] },
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: "github-light",
          keepBackground: false,
        },
      ],
    ],
  },
});

const nextConfig: NextConfig = {
  basePath: "/blog",
  assetPrefix: "/blog/",
  trailingSlash: true,
  output: "export",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default mdx(nextConfig);
