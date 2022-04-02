/* eslint-disable global-require */
import { FC, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Web3ContextProvider } from "./hooks/web3Context";
// import { Web3ReactProvider } from "@web3-react/core";

import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { initLocale } from "./locales";

import App from "./App";
import store from "./store";
import { THEME_LIGHT } from "./constants";

const Root: FC = () => {
  useEffect(() => {
    initLocale();

  }, []);

  const flag = sessionStorage.getItem("THEMIS_THEME");

  if (!flag) {
    sessionStorage.setItem("THEMIS_THEME", "true")
    const theme = localStorage.getItem("THS_THEME");
    document.documentElement.setAttribute('data-theme', theme || THEME_LIGHT)
  }


  return (
      <Web3ContextProvider>
        <Provider store={store}>
         <I18nProvider i18n={i18n}>
           <BrowserRouter basename={"/"}>
             <App />
           </BrowserRouter>
         </I18nProvider>
         </Provider>
      </Web3ContextProvider>
  );
};

export default Root;
