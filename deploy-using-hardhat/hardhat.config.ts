import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    stabilityprotocol: {
      url: "YOUR_STABILITY_RPC_URL",
      accounts: ["YOUR_PRIVATE_KEY"],
    },
  },
};

export default config;
