import '@nomiclabs/hardhat-ethers'
import { ethers } from 'hardhat'

async function deploy() {
  const HelloWorld = await ethers.getContractFactory('HelloWorld')
  const contract = await HelloWorld.deploy()

  await contract.deployed()

  return contract
}

//@ts-ignore
async function sayHello(contract) {
  console.log('Say hello:', await contract.hello())
}

deploy().then(sayHello)
