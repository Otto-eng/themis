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
// import getLibrary from "./utils/ethers/getLibrary";


import Vconsole from "vconsole";

if (process.env.REACT_APP_NODE_ENV !== "production") {
  new Vconsole({ maxLogNumber: 5000 });
}

const Root: FC = () => {
  useEffect(() => {
    initLocale();
  }, []);
  // const flag = sessionStorage.getItem("THEMIS_FLAG")

  // if (!flag) {
  //   localStorage.removeItem("walletconnect")
  //   localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER")
  //   sessionStorage.setItem("THEMIS_FLAG", true + "")
  // }
      // <Web3ReactProvider getLibrary={getLibrary}>

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
