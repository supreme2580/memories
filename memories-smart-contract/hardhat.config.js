require("@nomiclabs/hardhat-waffle"); //new update from hardhat requires to import 'hardhat-toolbox'
require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config();

module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 80001,
    },
    mumbai: {
      url: process.env.ALCHEMY_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
};