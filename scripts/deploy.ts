import { hexStripZeros } from "ethers/lib/utils";
import { ethers } from "hardhat";
const hre = require("hardhat")

//NFT SOL
async function main() {
  const NFT = await hre.ethers.getContractFactory("NFT")
  console.log("deploying...")
  const NFTDeployed = await NFT.deploy("NFT", "VAL");
  console.log("line 10",NFTDeployed.address)
  await NFTDeployed.deployed();
  console.log("The latest contract was deployed to Goerli", NFTDeployed.address)
}

//GENERAL


//Post
// async function main() {
//   const Post = await hre.ethers.getContractFactory("Post")
//   console.log("deploying...")
//   const PostDeployed = await Post.deploy("PostTST2", "VALT2");
//   console.log("line 10",PostDeployed.address)
//   await PostDeployed.deployed();
//   console.log("The latest contract was deployed to Goerli", PostDeployed.address)
// }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
