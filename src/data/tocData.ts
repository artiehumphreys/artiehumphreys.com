// data/tocData.ts
import type { TocSection } from "../components/TableOfContents/types";

export const tocData: TocSection[] = [
  {
    title: "Optimization",
    anchor: "/optimization.html",
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
    anchor: "/designing-algorithms.html",
    children: [
      {
        title: "Find Median From Data Stream: Two Heap Approach",
        anchor: "/designing-algorithms/median-in-stream.html",
      },
    ],
  },
  {
    title: "Competitive Programming",
    anchor: "/competitive-programming.html",
    children: [
      {
        title: "Codeforces Round 1017",
        anchor: "/competitive-programming/codeforces-round-1017.html",
      },
    ],
  },
];
