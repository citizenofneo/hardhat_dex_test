//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Proxy {
    uint256 public var1; // from Logic1
    uint256 public var2; // from Logic2
    uint256 public num; // from main Logic
    uint256 public num1; // from main Logic

    address owner; 
    address logicContract;

    constructor(address _logicContract) {
        owner = msg.sender;
        logicContract = _logicContract;
    }

    fallback(bytes calldata) external returns(bytes memory){
        (bool success, bytes memory data) = logicContract.delegatecall(msg.data);
        console.log("Fallback success: ", success);
        return data;
    }

    function changeLogicContract(address _newLogicContract) public {
        require(msg.sender == owner, "You is not Owner");
        logicContract = _newLogicContract;
    }
}
