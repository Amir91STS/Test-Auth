import "./app/utils/axios";
import "./app/theme/main.css";

import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { CacheProvider } from "@emotion/react";
import { ToastContainer } from "react-toastify";
import { CssBaseline, ThemeProvider } from "@mui/material";

import "react-toastify/dist/ReactToastify.css";
import theme from "./app/config/theme";
import { store } from "./app/config/store";
import createEmotionCache from "./app/utils/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

export default function MyApp({ Component, pageProps, ...props }) {
  const { emotionCache = clientSideEmotionCache } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Login App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
          <ToastContainer />
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}
