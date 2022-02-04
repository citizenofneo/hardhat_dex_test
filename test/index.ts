import { expect } from "chai";
import { ethers } from "hardhat";

const WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
const BUSD = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
const pnkRouterAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
describe("swapETHForExactTokens", function () {
  it("Should swap BNB to BUSD", async function () {
    const signer = (await ethers.getSigners())[0];
    const balance0 = await getUserBalance(BUSD, signer.address);
    console.log(
      `[0] Eth balance: ${
        Number(await signer.getBalance()) / 10 ** 18
      } | BUSD balance: ${balance0}`
    );
    const uniV2 = await ethers.getContractAt(
      "RouterV2",
      pnkRouterAddress,
      signer
    );
    const getWBNBTx = await uniV2.swapETHForExactTokens(
      "10000000000000000000",
      [WBNB, BUSD],
      signer.address,
      new Date().getTime() + 120 * 1000,
      {
        value: "10000000000000000000",
      }
    );
    await getWBNBTx.wait();
    const balance1 = await getUserBalance(BUSD, signer.address);
    console.log(
      `[1] Eth balance: ${
        Number(await signer.getBalance()) / 10 ** 18
      } | BUSD balance: ${balance1}`
    );
    expect(balance0).to.lt(balance1);
  });
});
const getUserBalance = async (tokenAddress: string, userAddress: string) => {
  const token = await ethers.getContractAt("IERC20", tokenAddress);
  return (
    Number(await token.balanceOf(userAddress)) /
    10 ** Number(await token.decimals())
  );
};
