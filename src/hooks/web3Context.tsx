import React, { useState, ReactElement, useContext, useEffect, useMemo, useCallback } from "react";
import Web3Modal from "web3modal";
import { StaticJsonRpcProvider, JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { IFrameEthereumProvider } from "@ledgerhq/iframe-provider";
import { EnvHelper } from "../helpers/Environment";
import { NodeHelper } from "src/helpers/NodeHelper";
import { NETWORK_CHAINID } from "src/constants";

/**
 * kept as function to mimic `getMainnetURI()`
 * @returns string
 */
function getTestnetURI() {
  return EnvHelper.alchemyTestnetURI;
}

/**
 * determine if in IFrame for Ledger Live
 */
function isIframe() {
  return globalThis.location !== globalThis.parent.location;
}

const ALL_URIs = NodeHelper.getNodesUris();

/**
 * "intelligently" loadbalances production API Keys
 * @returns string
 */
function getMainnetURI(): string {
  // Shuffles the URIs for "intelligent" loadbalancing
  const allURIs = ALL_URIs.sort(() => Math.random() - 0.5);

  // There is no lightweight way to test each URL. so just return a random one.
  // if (workingURI !== undefined || workingURI !== "") return workingURI as string;
  const randomIndex = Math.floor(Math.random() * allURIs.length);
  return allURIs[randomIndex];
}

/*
  Types
*/
type onChainProvider = {
  connect: () => Promise<Web3Provider | undefined>;
  disconnect: () => void;
  hasCachedProvider: () => boolean;
  address: string;
  chainID: number;
  connected: boolean;
  provider: JsonRpcProvider;
  uri: string;
  web3Modal: Web3Modal;
};

export type Web3ContextData = {
  onChainProvider: onChainProvider;
} | null;

const Web3Context = React.createContext<Web3ContextData>(null);

export const useWeb3Context = () => {
  const web3ContextData = useContext(Web3Context);
  if (!web3ContextData) {
    throw new Error(
      "useWeb3Context() can only be used inside of <Web3ContextProvider />, " + "please declare it at a higher level.",
    );
  }
  const { onChainProvider } = web3ContextData;
  return useMemo<onChainProvider>(() => {
    return { ...onChainProvider };
  }, [web3ContextData]);
};

export const useAddress = () => {
  const { address } = useWeb3Context();
  return address;
};


const initModal = new Web3Modal({
  network: "kovan", // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          [NETWORK_CHAINID]: getMainnetURI(),
        },
      },
    },
  },
})

export const Web3ContextProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  // NOTE (appleseed): if you are testing on rinkeby you need to set chainId === 4 as the default for non-connected wallet testing...
  // ... you also need to set getTestnetURI() as the default uri state below
  const [chainID, setChainID] = useState(0);
  const [address, setAddress] = useState("");

  const [uri, setUri] = useState(getMainnetURI());


  const [provider, setProvider] = useState<JsonRpcProvider>(new StaticJsonRpcProvider(uri));
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>(initModal);

  const hasCachedProvider = (): boolean => {
    if (!web3Modal) return false;
    if (!web3Modal.cachedProvider) return false;
    return true;
  };

  // NOTE (appleseed): none of these listeners are needed for Backend API Providers
  // ... so I changed these listeners so that they only apply to walletProviders, eliminating
  // ... polling to the backend providers for network changes
  const _initListeners = useCallback(
    rawProvider => {
      if (!rawProvider.on) {
        return;
      }
      rawProvider.on("accountsChanged", async (accounts: string[]) => {
        setTimeout(() => window.location.reload(), 1);
      });

      rawProvider.on("chainChanged", async (chain: number) => {
        _checkNetwork(chain);
        setTimeout(() => window.location.reload(), 1);
      });

      rawProvider.on("network", (_newNetwork: any, oldNetwork: any) => {
        if (!oldNetwork) return;

        window.location.reload();
      });
    },
    [provider],
  );

  /**
   * throws an error if networkID is not 1 (mainnet) or 4 (rinkeby)
   */
  const _checkNetwork = (otherChainID: number): boolean => {
    if (chainID !== otherChainID) {
      console.warn("You are switching networks");
      if (otherChainID === NETWORK_CHAINID) {
        setChainID(otherChainID);
        // otherChainID === NETWORK_CHAINID ?
        setUri(getMainnetURI())
          // : setUri(getTestnetURI());
        return true;
      }
      return false;
    }
    return true;
  };

  // connect - only runs for WalletProviders
  const connect = useCallback(async () => {
    // handling Ledger Live;
    let rawProvider;
    if (isIframe()) {
      rawProvider = new IFrameEthereumProvider();
    } else {
      rawProvider = await web3Modal.connect();
    }
    // new _initListeners implementation matches Web3Modal Docs
    // ... see here: https://github.com/Web3Modal/web3modal/blob/2ff929d0e99df5edf6bb9e88cff338ba6d8a3991/example/src/App.tsx#L185
    _initListeners(rawProvider);

    const connectedProvider = new Web3Provider(rawProvider, "any");
    const connectedAddress = await connectedProvider.getSigner().getAddress();
    setAddress(connectedAddress);
    const chainId = await connectedProvider.getNetwork().then(network => {
      return network.chainId
    });

    const validNetwork = _checkNetwork(chainId);
    if (!validNetwork) {
      setAddress("")
      console.error("Wrong network, please switch to Binance Smart Chain network");
      web3Modal && web3Modal.clearCachedProvider()
      setConnected(false)
      setChainID(0)
      return;
    }
    // Save everything after we've validated the right network.
    // Eventually we'll be fine without doing network validations.
    setProvider(connectedProvider);

    // Keep this at the bottom of the method, to ensure any repaints have the data we need
    setConnected(true);

    return connectedProvider;
  }, [provider, web3Modal, connected]);

  const disconnect = useCallback(async () => {
    setConnected(false);
    web3Modal.clearCachedProvider();

    setTimeout(() => {
      window.location.reload();
    }, 1);
  }, [provider, web3Modal, connected]);

  const onChainProvider = useMemo<onChainProvider>(
    () => ({ connect, disconnect, hasCachedProvider, provider, connected, address, chainID, web3Modal, uri }),
    [connect, disconnect, hasCachedProvider, provider, connected, address, chainID, web3Modal, uri],
  );

  useEffect(() => {
    // logs non-functioning nodes && returns an array of working mainnet nodes
    NodeHelper.checkAllNodesStatus().then((validNodes: any) => {
      validNodes = validNodes.filter((url: boolean | string) => url !== false);
      if (!validNodes.includes(uri) && NodeHelper.retryOnInvalid()) {
        // force new provider...
        setTimeout(() => {
          window.location.reload();
        }, 1);
      }
    });
  }, []);

  return <Web3Context.Provider value={{ onChainProvider }}>{children}</Web3Context.Provider>;
};