import { Layout } from "../src/components/commons/layout";
import type { AppProps } from "next/app";
import Head from "next/head";
import "antd/dist/antd.css";

import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import wrapper from "../src/commons/store/configureStore";
import { useRef } from "react";

function App({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <title>Natest</title>
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default wrapper.withRedux(App);
