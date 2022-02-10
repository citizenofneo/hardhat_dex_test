//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Logic1.sol";
import "./Logic2.sol";
import "hardhat/console.sol";

contract Logic is Logic1, Logic2 {
    uint256 public num;
    uint256 public num1;

    function setNum(uint256 a, uint256 b) public returns (uint256) {
        console.log("USE LOGIC: ", address(this), a, b);
        num = a + b;
        num1 = num + 1;
        return a + b;
    }
    function setVar1(uint256 _var) public {
        console.log("Setvar1: ", _var);
        var1 = _var;
    }
}
