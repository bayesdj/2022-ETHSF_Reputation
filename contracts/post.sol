// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Work is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    enum Status{ UNRATED, GOOD, BAD }

    mapping(uint => Status) public smap;
    mapping(uint => uint) public ycount;
    mapping(uint => uint) public ncount;
    mapping(address => bool) public voteStatus;
    address[] public whitelist;
    

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Work", "wrk") {}

    function safeMint(address to, string memory uri) public onlyOwner {
    // function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        smap[tokenId] = Status.UNRATED;
    }

    function adjWhiteList(address[] memory _whitelist) public onlyOwner {
        whitelist = _whitelist;
        for(uint i=0; i<_whitelist.length; i++){
            voteStatus[whitelist[i]] = true;
        }
    }

    function vote(uint _tokenid, bool yn) public {
        require(voteStatus[msg.sender]==true, "vote status is false");
        if(yn==true) {
            ycount[_tokenid] += 1;
        }
        else {
            ncount[_tokenid] += 1;
        }
        voteStatus[msg.sender] = false;
    }

    function voteCount(uint tokenid) public returns(Status) {
        uint y = ycount[tokenid];
        uint n = ncount[tokenid];
        Status s;
        if( y>n ){
            s = Status.GOOD;
        }
        else if( y<n ) {
            s = Status.BAD;
        }
        else{
            s = Status.UNRATED;
        }
        smap[tokenid] = s;
        return s;
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}