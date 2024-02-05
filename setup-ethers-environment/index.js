const { JsonRpcProvider } = require('ethers');

const provider = new JsonRpcProvider("https://free.testnet.stabilityprotocol.com");

const logCurrentBlockNumber = async () => {
  try {
    const blockNumber = await provider.getBlockNumber();
    console.log("Current block number:", blockNumber);
  } catch (error) {
    console.error("Error fetching the current block number:", error);
  }
};

logCurrentBlockNumber();