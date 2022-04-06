import React, { useState, ReactElement, useContext, useEffect, useMemo, useCallback } from "react";
import Web3Modal from "web3modal";
import { StaticJsonRpcProvider, JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { IFrameEthereumProvider } from "@ledgerhq/iframe-provider";
import { EnvHelper } from "../helpers/Environment";
import { NodeHelper } from "src/helpers/NodeHelper";
import { KOVAN_URI, NetworkId, NETWORK_CHAINID } from "src/constants";
import { Providers } from "src/helpers/providers/Providers";
import { ethers } from "ethers";


interface IGetCurrentNetwork {
  provider: StaticJsonRpcProvider | JsonRpcProvider;
}


export const idFromHexString = (hexString: string) => {
  return parseInt(hexString, 16);
};


export const initNetworkFunc = async ({ provider }: IGetCurrentNetwork) => {
  try {
    let networkName: string;
    let uri: string;
    let supported = true;
    const id: number = await provider.getNetwork().then(network => network.chainId);
    switch (id) {
      case 42:
        networkName = "Kovan";
        uri = KOVAN_URI;
        break;
      default:
        supported = false;
        networkName = "Unsupported Network";
        uri = "";
        break;
    }

    return {
      networkId: id,
      networkName: networkName,
      uri: uri,
      initialized: supported,
    };
  } catch (e) {
    console.log(e);
    return {
      networkId: -1,
      networkName: "",
      uri: "",
      initialized: false,
    };
  }
};


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


/**
 * "intelligently" loadbalances production API Keys
 * @returns string
 */
function getMainnetURI(): string {
  // Shuffles the URIs for "intelligent" loadbalancing
  return KOVAN_URI
}

/*
  Types
*/
type onChainProvider = {
  connect: () => Promise<Web3Provider | undefined>;
  disconnect: () => void;
  hasCachedProvider: () => boolean;
  address: string;
  connected: boolean;
  connectionError: IConnectionError | null;
  provider: JsonRpcProvider;
  web3Modal: Web3Modal;
  chainID: number;
  networkName: string;
  uri: string;
  providerInitialized: boolean;
};

interface IConnectionError {
  text: string;
  created: number;
}


export type Web3ContextData = {
  onChainProvider: onChainProvider;
} | null;

const Web3Context = React.createContext<Web3ContextData>(null);

export const useWeb3Context = () => {
  const web3Context = useContext(Web3Context);
  if (!web3Context) {
    throw new Error(
      "useWeb3Context() can only be used inside of <Web3ContextProvider />, " + "please declare it at a higher level.",
    );
  }
  const { onChainProvider } = web3Context;
  return useMemo<onChainProvider>(() => {
    return { ...onChainProvider };
  }, [web3Context]);
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
        infuraId: "e48190e478114e97b88a90a7a30f5915"
      },
    },
  },
})

export function checkCachedProvider(web3Modal: Web3Modal): boolean {
  if (!web3Modal) return false;
  const cachedProvider = web3Modal.cachedProvider;
  if (!cachedProvider) return false;
  return true;
}

export const Web3ContextProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [connected, setConnected] = useState(false);

  const [connectionError, setConnectionError] = useState<IConnectionError | null>(null);
  const [address, setAddress] = useState("");

  // NOTE (appleseed): if you are testing on rinkeby you need to set chainId === 4 as the default for non-connected wallet testing...
  // ... you also need to set getTestnetURI() as the default uri state below
  const [chainID, setChainID] = useState(0);

  const [networkName, setNetworkName] = useState("");
  const [providerInitialized, setProviderInitialized] = useState(false);
  const [uri, setUri] = useState("");
  const [provider, setProvider] = useState<any>(Providers.getStaticProvider(NetworkId.TESTNET_KOVAN));
  const web3Modal = initModal

  function hasCachedProvider(): boolean {
    return checkCachedProvider(web3Modal);
  }
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

      rawProvider.on("chainChanged", async (_chainId: string) => {
        const newChainId = idFromHexString(_chainId);
        const networkHash = await initNetworkFunc({ provider });
        if (newChainId !== networkHash.networkId) {
          // then provider is out of sync, reload per metamask recommendation
          setTimeout(() => window.location.reload(), 1);
        } else {
          setChainID(networkHash.networkId);
        }
      });

      rawProvider.on("disconnect", async (accounts: string[]) => {
        disconnect()
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
      try {
        rawProvider = await web3Modal.connect();
      } catch (e) {
        if (e !== "Modal closed by user") {
          setConnectionError({
            created: Date.now(),
            text: "Please check your Wallet UI for connection errors",
          });
        }
        setConnected(false);
        disconnect && disconnect()
        return;
      }
    }




    // new _initListeners implementation matches Web3Modal Docs
    // ... see here: https://github.com/Web3Modal/web3modal/blob/2ff929d0e99df5edf6bb9e88cff338ba6d8a3991/example/src/App.tsx#L185
    // _initListeners(rawProvider);


    const connectedProvider = new ethers.providers.Web3Provider(rawProvider);
    setProvider(connectedProvider);
    const connectedAddress = await connectedProvider.getSigner().getAddress();

    // Save everything after we've validated the right network.
    // Eventually we'll be fine without doing network validations.
    setAddress(connectedAddress);
    const networkHash = await initNetworkFunc({ provider: connectedProvider });
    setChainID(networkHash.networkId);
    setNetworkName(networkHash.networkName);
    setUri(networkHash.uri);
    setProviderInitialized(networkHash.initialized);
    // Keep this at the bottom of the method, to ensure any repaints have the data we need
    setConnected(true);

    return connectedProvider;
  }, [provider, web3Modal, connected]);

  // useEffect(() => {
  //   if (web3Modal.cachedProvider) {
  //     connect()
  //   }
  // }, [connect])

  const disconnect = useCallback(async () => {
    await web3Modal.clearCachedProvider()
    if (provider?.disconnect && typeof provider.disconnect === 'function') {
      await provider.disconnect()
      localStorage.removeItem("walletconnect")
    }
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }, [provider, web3Modal, connected]);

  const onChainProvider = useMemo(
    () => ({
      connect,
      disconnect,
      hasCachedProvider,
      provider,
      connected,
      connectionError,
      address,
      web3Modal,
      chainID,
      networkName,
      uri,
      providerInitialized,
    }),
    [
      connect,
      disconnect,
      hasCachedProvider,
      provider,
      connected,
      connectionError,
      address,
      web3Modal,
      chainID,
      networkName,
      uri,
      providerInitialized,
    ],
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