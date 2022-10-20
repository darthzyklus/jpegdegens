import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat"

 async function deploy() {
    const Counter = await ethers.getContractFactory("Counter");
    const contract = await Counter.deploy();

    await contract.deployed();

    console.log(contract.address);

    return contract;
 }

 async function count(contract) {
  await contract.count();
  console.log("Counter",await contract.getCounter());
 }

 deploy().then(count)