import { createPublicClient, http, defineChain } from 'viem'

const stbleTestnet = defineChain({
    id: 20180427,
    name: "Stability Testnet",
    network: "stability-testnet",
    nativeCurrency: {
      decimals: 18,
      name: "Decentralized Native Token",
      symbol: "DNT",
    },
    testnet: true,
    blockExplorers: {
      default: {
        name: "Stability Testnet",
        url: "https://stability-testnet.blockscout.com/",
      },
    },
    rpcUrls: {
      default: {
        http: ["https://free.testnet.stabilityprotocol.com"],
      },
      public: {
        http: ["https://free.testnet.stabilityprotocol.com"],
      },
    },
    contracts: {
      multicall3: {
        // https://raw.githubusercontent.com/mds1/multicall/main/src/Multicall3.sol
          address: "0x3ed62137c5DB927cb137c26455969116BF0c23Cb",
          blockCreated: 2318,
      },
    },
  });
 
const client = createPublicClient({ 
  chain: stbleTestnet, 
  transport: http(), 
}) 

async function getBlockNumber() {
  const blockNumber = Number(await client.getBlockNumber());
  return blockNumber
} 
getBlockNumber().then(blockNumber => {
  console.log('The Current Stability Block Number is', blockNumber);
});
