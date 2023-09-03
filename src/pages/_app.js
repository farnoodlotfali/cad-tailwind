import AppState from "@/Context/AppState";
import "@/styles/globals.css";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import "swiper/css";

export default function App({ Component, pageProps }) {
  return (
    <AppState>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="color-scheme" content="dark light" />
        <title> دراپ </title>
      </Head>
      <NextNProgress
        height={8}
        color={"#202c43"}
        showOnShallow={true}
        startPosition={0.3}
      />
      {Component.PageLayout ? (
        <Component.PageLayout>
          <Component {...pageProps} />
        </Component.PageLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </AppState>
  );
}
