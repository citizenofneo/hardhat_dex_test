//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Logic {
    uint public num;
    address public sender;
    uint public value;

    function setVars(uint _num) public payable {
        console.log("USE LOGIC: ", address(this), _num);
        num = _num;
        sender = msg.sender;
        value = msg.value;
    }
}
