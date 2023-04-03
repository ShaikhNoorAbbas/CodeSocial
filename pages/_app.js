import Head from "next/head";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "@Redux/store";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Slabo+13px&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap"
            rel="stylesheet"
          />
        </Head>
        <SessionProvider>
          <Component {...pageProps} />;
        </SessionProvider>
      </Provider>
    </>
  );
}
