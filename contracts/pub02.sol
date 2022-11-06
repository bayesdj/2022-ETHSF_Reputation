// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract ReputationSystem {
    mapping(address => uint256) public reputation;
    struct pub {
        string title;
        
    }
    struct citation{
        string title;
        address sm_add;
    }
    

    work[] public citations;

    constructor(){

    }

    function cite(address _sm_add, uint _repu) public {
        require(reputation > _repu);
        
    }

    // function ownerWithdraw() external payable onlyOwner{
    //     payable(msg.sender).transfer(address(this).balance);
    // }


}