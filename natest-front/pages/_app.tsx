import { Layout } from "../src/components/commons/layout";
import type { AppProps } from "next/app";
import Head from "next/head";
import "antd/dist/antd.css";

import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store } from "../src/commons/store/configureStore";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <Provider store={store()}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <title>Natest</title>
            <link rel="shortcut icon" href="/favicon.png" />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          {/* <ReactQueryDevtools /> */}
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
}
