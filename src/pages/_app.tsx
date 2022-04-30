import "../styles/global.css";
import "../styles/TiptapEditor.css";

import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { IntlProvider } from "react-intl";
import flatten from "flat";
import { useRouter } from "next/router";
import store from "../store";

import zhTW from "../locales/zh-TW.json";

const messages = {
  "zh-TW": zhTW,
};

function MyApp({ Component, pageProps }: AppProps) {
  const { locale, defaultLocale } = useRouter();

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={defaultLocale}
      messages={flatten(messages[defaultLocale])}
    >
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </IntlProvider>
  );
}

export default MyApp;
