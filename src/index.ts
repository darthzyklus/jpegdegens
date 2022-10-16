import { ethers } from "ethers";

function getEth() {
  //@ts-ignore
  const eth = window.ethereum;

  if (!eth) {
    throw new Error("get metamask extension");
  }

  return eth;
}

async function hasAccounts() {
  const eth = getEth()
  const accounts = await eth.request({method: 'eth_accounts'}) as string[];

  return accounts && accounts.length
}

async function requestAccounts() {
  const eth = getEth()
  const accounts = await eth.request({method: 'eth_requestAccounts'}) as string[];

  return accounts && accounts.length
}

async function run() {
  if (!await hasAccounts() && !await requestAccounts()) {
    throw new Error("please allow access to your metamask accounts")
  }

  const contract = new ethers.Contract(
    "0x5fbdb2315678afecb367f032d93f642f64180aa3", // address?
    [
      "function hello() public pure returns(string memory)"
    ], // contract interface?
    new ethers.providers.Web3Provider(getEth())
  )

  document.body.innerHTML = await contract.hello()
}

run();