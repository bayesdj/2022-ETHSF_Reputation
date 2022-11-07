// import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";

// const config: HardhatUserConfig = {
//   solidity: "0.8.17",
// };
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan"
require("dotenv").config()
console.log("env variables",[process.env.PRIVATE_KEY])
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.JAVELIN_GOERLI,
      accounts: [process.env.PRIVATE_KEY]
    },
    'optimism-goerli': {
      url: process.env.OP_GOERLI,
      accounts: [process.env.PRIVATE_KEY]
    },
    'matic': {
      url: process.env.MUMBAI,
      accounts: [process.env.PRIVATE_KEY]
    },
    'skale': {
      url: process.env.SKALE2,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  'etherscan': {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};

export default config;