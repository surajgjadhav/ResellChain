// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ProductPriceDetails {
    error ProductPriceDetails__InvalidPrice();
    error ProductPriceDetails__InvalidToken();

    mapping(uint256 tokenId => uint256 price) tokenToPrice;

    event PriceUpdated(uint256 indexed tokenId, uint256 indexed updatedPrice, address modifiedBy);

    constructor() {}

    function _updatePrice(uint256 tokenId, uint256 updatedPrice) internal {
        if (updatedPrice <= 0) {
            revert ProductPriceDetails__InvalidPrice();
        }
        tokenToPrice[tokenId] = updatedPrice;

        emit PriceUpdated(tokenId, updatedPrice, msg.sender);
    }

    function getTokenPrice(uint256 tokenId) public view returns (uint256 tokenPrice) {
        if (tokenToPrice[tokenId] == 0) {
            revert ProductPriceDetails__InvalidToken();
        }

        return tokenToPrice[tokenId];
    }
}
