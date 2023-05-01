import { Layout } from "../src/components/commons/layout";
import type { AppProps } from "next/app";
import Head from "next/head";
import "antd/dist/reset.css";
import "antd/dist/antd";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
