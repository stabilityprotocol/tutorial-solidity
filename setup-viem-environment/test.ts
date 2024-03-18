import { createPublicClient, http, defineChain } from "viem";

// The following code defines two chains, the Stability Testnet and the Global Trust Network.
const stbleTestnet = defineChain({
  id: 20180427,
  name: "Stability Testnet",
  network: "stability-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "FREE",
    symbol: "FREE",
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

const globalTrustNetwork = defineChain({
  id: 101010,
  name: "Global Trust Network",
  network: "global-trust-network",
  nativeCurrency: {
    decimals: 18,
    name: "FREE",
    symbol: "FREE",
  },
  testnet: true,
  blockExplorers: {
    default: {
      name: "Global Trust Network",
      url: "https://stability.blockscout.com/",
    },
  },
  rpcUrls: {
    default: {
      http: ["https://gtn.stabilityprotocol.com"],
    },
    public: {
      http: ["https://gtn.stabilityprotocol.com"],
    },
  },
  contracts: {
    multicall3: {
      // https://raw.githubusercontent.com/mds1/multicall/main/src/Multicall3.sol
      address: "0xBA2923DAe45aD6b8B77bff4733c75b0C13F0ce2d",
      blockCreated: 3101,
    },
  },
});

// The following code creates two clients, one for the Stability Testnet and one for the Global Trust Network.
const testnetClient = createPublicClient({
  chain: stbleTestnet,
  transport: http(),
});

const gtnClient = createPublicClient({
  chain: globalTrustNetwork,
  transport: http(),
});

// The following code retrieves the current block numbers for the Stability Testnet and the Global Trust Network.
async function getBlockNumbers() {
  const testnetBlockNumber = Number(await testnetClient.getBlockNumber());
  const gtnBlockNumber = Number(await gtnClient.getBlockNumber());
  return { testnetBlockNumber, gtnBlockNumber };
}

// The following code logs the current block numbers for the Stability Testnet and the Global Trust Network in console.
getBlockNumbers().then(({ testnetBlockNumber, gtnBlockNumber }) => {
  console.log(
    "The Current Stability Testnet Block Number is",
    testnetBlockNumber
  );
  console.log(
    "The Current Global Trust Network Block Number is",
    gtnBlockNumber
  );
});