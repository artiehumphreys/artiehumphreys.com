// pages/_app.tsx
import Head from "next/head";
import type { AppProps } from "next/app";
import "../../styles/globals.css";
import "katex/dist/katex.min.css";

import { SidebarProvider } from "@/components/Sidebar/SidebarProvider";
import { tocData } from "@/data/tocData";
import dynamic from "next/dynamic";

const LeftRailToc = dynamic(() => import("@/components/LeftRailToc"), {
  ssr: false,
});
const SidebarOffset = dynamic(
  () => import("@/components/Sidebar/SidebarOffset"),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <LeftRailToc sections={tocData} />

      <SidebarOffset>
        <Head>
          <title>Artie Humphreys&apos; Blog</title>
          <meta
            name="description"
            content="My personal explorations through the worlds of algorithmic optimization, creation, and beyond."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </SidebarOffset>
    </SidebarProvider>
  );
}
