import React, { createContext, useCallback, useContext, useState } from "react"
import copyText from 'copy-text-to-clipboard'
import { UseWalletProvider } from 'use-wallet'
import axios from 'axios';
import { create as ipfsHttpClient } from 'ipfs-http-client'
import walletConfig from '../WalletContext/config'

const POLLING_INTERVAL = 12000
const rpcUrl = walletConfig.rpcUrls[0]
const chainId = parseInt(walletConfig.chainId, 16);

export const GlobalContext = createContext()

const ipfs = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

export const GlobalProvider = ({ children }) => {
  const [global, setGlobal] = useState({
    serverURL: process.env.REACT_APP_SERVER_URL,
    sessionKey: "logInIdV1",
  })

  const [reloadSaleCounter, setReloadSaleCounter] = useState(0);

  const reloadSales = useCallback(() => {
    setReloadSaleCounter(t => t + 1);
  }, [reloadSaleCounter])

  const invokeServer = useCallback(async (method, route, data) => {
    if (method === 'post') {
      return axios.post(global.serverURL + route, data);
    } else if (method === 'get') {
      return axios.get(global.serverURL + route);
    } else if (method === 'put') {
      return axios.put(global.serverURL + route, data);
    }
  }, [global.serverURL])

  const addFileToIPFS = async (file) => {
    return ipfs.add(file);
  }

  const getIPFSUrl = (hash) => {
    return `https://ipfs.infura.io/ipfs/${hash}`;
  }

  const copyToClipboard = (text) => {
    copyText(text);
  }

  const refreshPage = () => {
    window.location.reload();
  }

  return (
    <React.StrictMode>
      <UseWalletProvider
        chainId={chainId}
        autoConnect={true}
        connectors={{
          injected: {
            chainId: [chainId,],
            rpc: {
              [chainId]: rpcUrl
            }
          },
          walletconnect: {
            rpc: {
              [chainId]: rpcUrl
            },
            bridge: 'https://bridge.walletconnect.org',
            pollingInterval: POLLING_INTERVAL,
          }
        }}
      >
        <GlobalContext.Provider value={{ global, invokeServer, addFileToIPFS, getIPFSUrl, reloadSaleCounter, reloadSales, copyToClipboard, refreshPage }}>
          {children}
        </GlobalContext.Provider>
      </UseWalletProvider>
    </React.StrictMode>
  )
}

export const useGlobal = () => {
  const globalManager = useContext(GlobalContext)
  return globalManager || [{}, async () => { }]
}
