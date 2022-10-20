// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
/*
We want to be able to generate random Hereos.
The user gets to put in their class of hereo on generation
classes: Mage, Healer, Barbarian
Class will not influence stats created, therefore getting an epic hero will be hard.
I want to be paid... 0.05 eth per hero!
I should be able to get my heroes I have generated.
Heroes should be stored on the chain.
stats are strength, health, intellect, magic, dexterity
stats are randomly generated
A scale of 1 - 18
The stats are randomly picked and their amplitude is randomly determined according to the following:
Stat 1 can max at 18
Stat 2 can max at 17
Stat 3 can max at 16
...
You could imagine these being an NFT
They are non divisable
*/

contract Hero {
  enum Class { Mage, Healer, Barbarian }

  mapping(address => uint[]) addressToHeroes;

  function getHeroes() public view returns (uint[] memory) {
    return addressToHeroes[msg.sender];
  }

  function createHero(Class class) public payable {
    require(msg.value >= 0.05 ether, "Please send more money");
  }
}
