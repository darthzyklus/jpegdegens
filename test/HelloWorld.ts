import '@nomiclabs/hardhat-ethers'
import { ethers } from 'hardhat'
import { expect } from 'chai'

describe('hello world', function () {
  it('should say hi', async function () {
    // 1.setup
    // 2.deploy
    // 3.call our function to test

    const HelloWorld = await ethers.getContractFactory('HelloWorld')
    const contract = await HelloWorld.deploy()
    await contract.deployed()

    expect(await contract.hello()).to.equal('Hello, World')
  })
})
