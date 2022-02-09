//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Proxy {
    uint256 public num;
    address public sender;
    uint256 public value;
    address logicContract;

    constructor(address _logicContract) {
        logicContract = _logicContract;
    }

    function setVars(uint256 _num) public payable {
        // A's storage is set, B is not modified.
        (bool success, bytes memory data) = logicContract.delegatecall(
            abi.encodeWithSignature("setVars(uint256)", _num)
        );
        console.log("USE PROXY", success);
    }
}
