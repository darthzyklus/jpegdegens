import "@nomiclabs/hardhat-ethers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Hero", function () {
  async function deployContract() {
    const Hero = await ethers.getContractFactory("Hero");
    const contract = await Hero.deploy()

    await contract.deployed()

    return contract;
  }

  let contract;

  before(async function() {
    contract = await deployContract();
  })

  it("should fail at creating hero cause of payment", async function() {
    let e;

    try {
      await contract.createHero(0, {
        value: ethers.utils.parseEther("0.0499999999")
      })
    }
    catch(err) {
      e = err
    }

    expect(e.message.includes("Please send more money")).to.equal(true);

  });
});