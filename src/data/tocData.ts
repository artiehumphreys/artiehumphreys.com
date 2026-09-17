// data/tocData.ts
import type { TocSection } from "../components/TableOfContents/types";

export const tocData: TocSection[] = [
  {
    title: "Optimization",
    anchor: "/optimization.html",
    children: [
      {
        title: "Lock-Free SPSC Queue",
        anchor: "/optimization/spsc-queue.html",
      },
      {
        title: "Particle Simulation",
        anchor: "/optimization/particle-simulation.html",
      },
      {
        title: "1 Billion Row Challenge",
        anchor: "/optimization/1brc.html",
      },
    ],
  },
  {
    title: "Designing Algorithms",
    anchor: "/designing-algorithms.html",
    children: [
      {
        title: "Rabin-p vs. RSA Public-Key Cryptosystems",
        anchor: "/designing-algorithms/rabin-p-cryptosystem.html",
      },
      {
        title: "Find Median from Data Stream",
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
