import Web3 from "web3";
let isItConnected = false;

const chainId = 137 // Polygon Mainnet
const networks = {
  bsc: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: " Polygon Mainnet",
    nativeCurrency: {
      name: "Polygon",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [
      " https://matic-mainnet.chainstacklabs.com",
      " https://polygon-rpc.com	",
      "https://rpc-mainnet.maticvigil.com",
      "https://rpc.ankr.com/polygon",
      " https://rpc-mainnet.matic.quiknode.pro	",
      "https://poly-rpc.gateway.pokt.network	",
      " https://polygonapi.terminet.io/rpc	",
      "https://matic-mainnet-archive-rpc.bwarelabs.com	",
      "https://matic-mainnet-full-rpc.bwarelabs.com	",
      "https://polygon-mainnet.public.blastapi.io	",
      "https://rpc-mainnet.matic.network"
    ],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
};

const changeNetwork = async ({ networkName }) => {
  if (window.ethereum.networkVersion !== chainId) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: window.web3.utils.toHex(chainId) }]
      });
    } catch (err) {
        // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: 'Polygon Mainnet',
              chainId: window.web3.utils.toHex(chainId),
              nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
              rpcUrls: ['https://polygon-rpc.com/']
            }
          ]
        });
      }
    }
  }
};


// const changeNetwork = async ({ networkName }) => {
//   try {
//     if (!window.ethereum) throw new Error("No crypto wallet found");
//     // await window.ethereum.request({
//     //   method: 'wallet_switchEthereumChain',
//     //   params: [{ chainId: chainId }], // Hexadecimal version of 80001, prefixed with 0x
//     // });
//     await window.ethereum.request({
//       method: 'wallet_addEthereumChain',
//       params: [
//         {
//           chainName: 'Polygon Mainnet',
//           chainId: Web3.utils.toHex(chainId),
//           nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
//           rpcUrls: ['https://polygon-rpc.com/']
//         }
//       ]
//     });
//     // await window.ethereum.request({
//     //   method: "wallet_addEthereumChain",
//     //   params: [
//     //     {
//     //       ...networks[networkName],
//     //     },
//     //   ],
//     // });
//   } catch (err) {

//     await window.ethereum.request({
//       method: "wallet_addEthereumChain",
//       params: [
//         {
//           ...networks[networkName],
//         },
//       ],
//     });
//     console.log("not found");
//   }
// };
const handleNetworkSwitch = async (networkName) => {
  await changeNetwork({ networkName });
};
let accounts;
const getAccounts = async () => {
  const web3 = window.web3;
  try {
    accounts = await web3.eth.getAccounts();
    return accounts;
  } catch (error) {
    console.log("Error while fetching acounts: ", error);
    return null;
  }
};
export const disconnectWallet = async () => {
  await window.ethereum.request({
    method: "eth_requestAccounts",
    params: [{ eth_accounts: {} }],
  });
  console.log("disconnect");
};
export const loadWeb3 = async () => {
  try {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      await window.web3.eth.getChainId((err, netId) => {
        // console.log("networkId==>", netId);
        switch (netId.toString()) {
          case "137":
            isItConnected = true;
            break;
          default:
            handleNetworkSwitch("MATIC");
            isItConnected = false;
        }
      });
      if (isItConnected == true) {
        let accounts = await getAccounts();

        console.warn("accounts", accounts[0])
        return accounts[0];
      } else {
        let res = "Wrong Network";
        return res;
      }
    } else {
      let res = "No Wallet";
      return res;
    }
  } catch (error) {
    let res = "No Wallet";
    return res;
  }
};