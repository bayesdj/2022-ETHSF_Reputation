// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

interface pub01 {
    function incrementRevenue() external;
}

contract Publication is Ownable {
    // uint public reputation;
    string public title;
    uint public multiplier;
    bool public hasShareholder;
    mapping(address => uint256) public shareholders;
    uint public equity;
    uint public revenue;
    uint public initialShare;
    struct citation {
        address sm_add;
        string title;
    }

    citation[] public citations;

    constructor(){
        initialShare = 200; 
        multiplier = 1e15; /// one finney
        // require(msg.value == initialShare * multiplier, "need to 200 to publish");
        shareholders[msg.sender] += initialShare * multiplier;
        equity = 0;
    }

    function incrementRevenue(uint amount) public{
        revenue += amount;
    }

    function cite(address _sm_add, uint _repu) public payable{
        uint repu = _repu * multiplier;
        require(address(this).balance > repu);
        payable(_sm_add).transfer(repu);  
        pub01(_sm_add).incrementRevenue(repu);
    }

    function stake(uint _amount) public payable{
        uint amount = _amount * multiplier;
        shareholders[msg.sender] += amount;
        equity += amount; 
    }

    function withdrawEquity(uint _repu) external payable onlyOwner{
        require(msg.value < equity);
        equity -= msg.value;
        payable(msg.sender).transfer(msg.value);
    }

    // function ownerWithdraw() external payable onlyOwner{
    //     payable(msg.sender).transfer(address(this).balance);
    // }
}