import { hexStripZeros } from "ethers/lib/utils";
import { ethers } from "hardhat";
const hre = require("hardhat")

//NFT SOL
// async function main() {
//   const CRED = await hre.ethers.getContractFactory("Credential")
//   console.log("deploying...")
//   const CREDDeployed = await CRED.deploy();
//   console.log("line 10",CREDDeployed.address)
//   await CREDDeployed.deployed();
//   console.log("The latest contract was deployed", CREDDeployed.address)
// }

async function main() {
  const Post = await hre.ethers.getContractFactory("Post")
  console.log("deploying...")
  const PostDeployed = await Post.deploy();
  console.log("line 10",PostDeployed.address)
  await PostDeployed.deployed();
  console.log("The latest contract was deployed", PostDeployed.address)
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
