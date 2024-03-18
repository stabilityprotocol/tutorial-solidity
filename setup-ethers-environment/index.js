const { JsonRpcProvider } = require('ethers');

const providerTest = new JsonRpcProvider("https://free.testnet.stabilityprotocol.com");
const providerGTN = new JsonRpcProvider("https://gtn.stabilityprotocol.com");

const logCurrentBlockNumbers = async () => {
  try {
    const blockNumber = await providerTest.getBlockNumber();
    console.log("Current block number on Stability Testnet:", blockNumber);
  } catch (error) {
    console.error("Error fetching the current block number on Stability Testnet:", error);
  }
  try {
    const blockNumber = await providerGTN.getBlockNumber();
    console.log("Current block number on Stability GTN:", blockNumber);
  } catch (error) {
    console.error("Error fetching the current block number on Stability GTN:", error);
  }
};

logCurrentBlockNumbers();