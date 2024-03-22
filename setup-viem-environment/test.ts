import { createPublicClient, http, defineChain, PublicClient } from "viem";
import * as dotenv from "dotenv";
dotenv.config();

// The following code retrieves the environment variables from the .env file if you are using a private key for the Stability Testnet or the Global Trust Network.
function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    console.error(`${key} is not set in .env file`);
    return "";
  }
  return value;
}

const testnetApiKey = getEnvVariable("TESTNET_API_KEY");
const gtnApiKey = getEnvVariable("GTN_API_KEY");

// The following code defines the Stability Testnet and the Global Trust Network chains. If you have supplied a private key for either, it will also define the chains with private RPC URLs.
// In practice, this code would be placed in a separate file, such as chains.ts, and imported into your main application file. It is included here for demonstration purposes and simplicity of the example.
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

const stbleTestnetPrivateRPC = defineChain({
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
      http: ["https://free.testnet.stabilityprotocol.com/zgt/" + testnetApiKey],
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

const globalTrustNetworkPrivateRPC = defineChain({
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
      http: ["https://gtn.stabilityprotocol.com/zgt/" + gtnApiKey],
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

// The following code creates two clients, one for the Stability Testnet and one for the Global Trust Network. If you have supplied a private key for either, it will also create clients with private RPC URLs.
const testnetClient = createPublicClient({
  chain: stbleTestnet,
  transport: http(),
});

const gtnClient = createPublicClient({
  chain: globalTrustNetwork,
  transport: http(),
});

let testnetPrivateRPCClient: PublicClient;
let gtnPrivateRPCClient: PublicClient;

if (testnetApiKey !== "") {
  testnetPrivateRPCClient = createPublicClient({
    chain: stbleTestnetPrivateRPC,
    transport: http(),
  });
}

if (gtnApiKey !== "") {
  gtnPrivateRPCClient = createPublicClient({
    chain: globalTrustNetworkPrivateRPC,
    transport: http(),
  });
}

// The following code retrieves the current block numbers for the Stability Testnet and the Global Trust Network. If you have supplied a private key for either, it will also retrieve the block numbers with private RPC URLs.
async function getBlockNumbers() {
  const testnetBlockNumber = Number(await testnetClient.getBlockNumber());
  const gtnBlockNumber = Number(await gtnClient.getBlockNumber());
  let testnetBlockNumberPrivateRPC = 0;
  let gtnBlockNumberPrivateRPC = 0;
  if (testnetApiKey !== "") {
    testnetBlockNumberPrivateRPC = Number(
      await testnetPrivateRPCClient.getBlockNumber()
    );
  }
  if (gtnApiKey !== "") {
    gtnBlockNumberPrivateRPC = Number(
      await gtnPrivateRPCClient.getBlockNumber()
    );
  }
  return {
    testnetBlockNumber,
    gtnBlockNumber,
    testnetBlockNumberPrivateRPC,
    gtnBlockNumberPrivateRPC,
  };
}

// The following code logs the current block numbers for the Stability Testnet and the Global Trust Network in console. If you have supplied a private key for either, it will also log the block numbers with private RPC URLs.
getBlockNumbers().then(
  ({
    testnetBlockNumber,
    gtnBlockNumber,
    testnetBlockNumberPrivateRPC,
    gtnBlockNumberPrivateRPC,
  }) => {
    console.log(
      "The Current Stability Testnet Block Number is",
      testnetBlockNumber
    );
    console.log(
      "The Current Global Trust Network Block Number is",
      gtnBlockNumber
    );
    if (testnetApiKey !== "") {
      console.log(
        "The Current Stability Testnet Block Number with Private RPC is",
        testnetBlockNumberPrivateRPC
      );
    }
    if (gtnApiKey !== "") {
      console.log(
        "The Current Global Trust Network Block Number with Private RPC is",
        gtnBlockNumberPrivateRPC
      );
    }
  }
);
