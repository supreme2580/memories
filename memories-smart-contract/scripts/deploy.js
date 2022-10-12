const hre = require("hardhat");

async function main() {
  const memoriesContractFactory = await hre.ethers.getContractFactory("Memories")
  const memoriesContract = await memoriesContractFactory.deploy()
  await memoriesContract.deployed()
  console.log("Contract deployed to:", memoriesContract.address);
}

main()

