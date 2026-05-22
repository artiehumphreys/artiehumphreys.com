// pages/_app.tsx
import Head from "next/head";
import type { AppProps } from "next/app";
import "../../styles/globals.css";
import "katex/dist/katex.min.css";

import { SidebarProvider } from "@/components/Sidebar/SidebarProvider";
import { tocData } from "@/data/tocData";
import dynamic from "next/dynamic";
import SidebarOffset from "@/components/Sidebar/SidebarOffset";

const LeftRailToc = dynamic(() => import("@/components/LeftRailToc"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SidebarProvider defaultOpen={false}>
      <LeftRailToc sections={tocData} />

      <SidebarOffset>
        <Head>
          <title>Artie Humphreys</title>
          <meta
            name="description"
            content="My personal explorations through the worlds of algorithmic optimization, creation, and beyond."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:site_name" content="Artie Humphreys" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Artie Humphreys" />
          <meta
            property="og:description"
            content="My personal explorations through the worlds of algorithmic optimization, creation, and beyond."
          />
          <meta property="og:url" content="https://artiehumphreys.com/" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Artie Humphreys" />
          <meta
            name="twitter:description"
            content="My personal explorations through the worlds of algorithmic optimization, creation, and beyond."
          />
          <link rel="icon" href="data:," />
        </Head>
        <Component {...pageProps} />
      </SidebarOffset>
    </SidebarProvider>
  );
}
