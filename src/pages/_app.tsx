import "../../styles/globals.css";
import "katex/dist/katex.min.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <title>Artie Humphreys&apos; Blog</title>
      <meta
        name="description"
        content="My personal explorations through the worlds of algorithmic optimization, creation, and beyond."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Component {...pageProps} />
    </>
  );
}
