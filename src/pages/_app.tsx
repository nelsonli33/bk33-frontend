import "../styles/global.css";
import "../styles/TiptapEditor.css";

import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { IntlProvider } from "react-intl";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import flatten from "flat";
import { useRouter } from "next/router";
import store from "../store";

import zhTW from "../locales/zh-TW.json";

const messages = {
  "zh-TW": zhTW,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 30000,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const { locale, defaultLocale } = useRouter();

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={defaultLocale}
      messages={flatten(messages[defaultLocale])}
    >
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </Provider>
    </IntlProvider>
  );
}

export default MyApp;
