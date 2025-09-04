// data/tocData.ts
import type { TocSection } from "../components/TableOfContents/types";

export const tocData: TocSection[] = [
  {
    title: "Optimization",
    anchor: "/optimization",
    children: [
      {
        title:
          "Particle Simulation: Improving Performance by 20x With Parallelization",
        anchor: "/optimization/particle-simulation.html",
      },
    ],
  },
  {
    title: "Designing Algorithms",
    anchor: "designing-algorithms",
    children: [
      {
        title: "Find Median From Data Stream: Two Heap Approach",
        anchor: "/wip.html",
      },
    ],
  },
  {
    title: "Competitive Programming",
    anchor: "/wip.html",
    children: [
      { title: "Codeforces Round 1017", anchor: "codeforces-round-1017" },
    ],
  },
];
