import { ethers } from "ethers";
import Contract from "../artifacts/contracts/Counter.sol/Counter.json"

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

  const address = process.env.CONTRACT_ADDRESS;
  const provider = new ethers.providers.Web3Provider(getEth()).getSigner();

  const contract = new ethers.Contract(address, Contract.abi, provider);

  const el = document.createElement('div')
  const button = document.createElement('button')

  button.innerText = "increment"

  async function setCounter(count?: number) {
    el.innerHTML = count || await contract.getCounter();
  }

  button.onclick = async function() {
    const tx = await contract.count();
    await tx.wait();
    setCounter();
  }

  contract.on(contract.filters.CounterInc(), function (count) {
    setCounter(count)
  })

  setCounter();

  document.body.appendChild(el);
  document.body.appendChild(button);
}

run();