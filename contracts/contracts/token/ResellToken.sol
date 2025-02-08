// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ResellToken is ERC721URIStorage {
    uint256 private _nextTokenId;

    constructor() ERC721("ResellToken", "RT") {}

    function _mintResellToken(address to, string memory tokenURI) internal returns (uint256) {
        uint256 tokenId = ++_nextTokenId;
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        return tokenId;
    }
}
