import { AppLayout } from "../src/components/commons/layout";
import type { AppProps } from "next/app";
import Head from "next/head";
import "antd/dist/reset.css";

import wrapper from "../src/commons/store/configureStore";
import { Provider } from "react-redux";

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Natest</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <AppLayout>
        <Component {...props.pageProps} />
      </AppLayout>
    </Provider>
  );
}
