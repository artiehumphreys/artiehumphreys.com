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
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="color-scheme" content="light dark" />
          <meta
            key="description"
            name="description"
            content="My personal explorations through the worlds of algorithmic optimization, creation, and beyond."
          />
          <meta property="og:site_name" content="Artie Humphreys" />
          <meta key="og:type" property="og:type" content="website" />
          <meta key="og:title" property="og:title" content="Artie Humphreys" />
          <meta
            key="og:description"
            property="og:description"
            content="My personal explorations through the worlds of algorithmic optimization, creation, and beyond."
          />
          <meta
            key="og:url"
            property="og:url"
            content="https://artiehumphreys.com/"
          />
          <meta
            key="og:image"
            property="og:image"
            content="https://artiehumphreys.com/og/home.png"
          />
          <meta key="og:image:width" property="og:image:width" content="1200" />
          <meta key="og:image:height" property="og:image:height" content="630" />
          <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
          <meta key="twitter:title" name="twitter:title" content="Artie Humphreys" />
          <meta
            key="twitter:description"
            name="twitter:description"
            content="My personal explorations through the worlds of algorithmic optimization, creation, and beyond."
          />
          <meta
            key="twitter:image"
            name="twitter:image"
            content="https://artiehumphreys.com/og/home.png"
          />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        </Head>
        <Component {...pageProps} />
      </SidebarOffset>
    </SidebarProvider>
  );
}
