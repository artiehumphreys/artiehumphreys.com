// data/tocData.ts
import type { TocSection } from "../components/TableOfContents/types";

export const tocData: TocSection[] = [
  {
    title: "Optimization",
    anchor: "/blog/optimization",
    children: [
      {
        title:
          "Particle Simulation: Improving Performance by 10x With Parallelization",
        anchor: "/blog/optimization/particle-simulation",
      },
    ],
  },
  {
    title: "Designing Algorithms",
    anchor: "designing-algorithms",
    children: [
      {
        title: "Find Median From Data Stream: Two Heap Approach",
        anchor: "median-in-a-stream",
      },
    ],
  },
  {
    title: "Competitive Programming",
    anchor: "competitive-programming",
    children: [
      { title: "Codeforces Round 1017", anchor: "codeforces-round-1017" },
    ],
  },
];
