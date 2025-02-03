// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ResellToken} from "./token/ResellToken.sol";
import {ProductPriceDetails} from "./utils/ProductPriceDetails.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract ResellNFT is ResellToken, ProductPriceDetails, Ownable {
    /**
     * Errors
     */
    error ResellNFT__OnlyIssuerOrItselfIsAllowded();
    error ResellNFT__OnlyITokenOwnerAllowded();

    struct TokenDetails {
        uint256 id;
        string uri;
        uint256 price;
    }

    address internal s_issuer;

    /**
     * Events
     */
    event SetIssuer(address indexed issuer);
    event ProductAdded(uint256 indexed tokenId, string tokenURI, uint256 price);

    constructor() Ownable(msg.sender) {}

    /**
     * Modifiers
     */
    modifier onlyIssuerOrItself() {
        if (msg.sender != s_issuer && msg.sender != owner()) {
            revert ResellNFT__OnlyIssuerOrItselfIsAllowded();
        }
        _;
    }

    modifier onlyTokenOwner(uint256 _tokenId) {
        if (msg.sender != ownerOf(_tokenId)) {
            revert ResellNFT__OnlyITokenOwnerAllowded();
        }
        _;
    }

    modifier onlyIssuerOrOwner(uint256 _tokenId) {
        if (msg.sender != ownerOf(_tokenId) && msg.sender != s_issuer) {
            revert ResellNFT__OnlyITokenOwnerAllowded();
        }
        _;
    }

    /**
     * This function sets address of issuer which has access of minting token
     * only token owner has access to set issuer address
     * @param issuer address of issuer
     */
    function setIssuer(address issuer) external onlyOwner {
        s_issuer = issuer;
        emit SetIssuer(issuer);
    }

    function mintAndUpdateProductPrice(address to, string memory tokenURI, uint256 price)
        external
        onlyIssuerOrItself
        returns (uint256 tokenId)
    {
        tokenId = _mintResellToken(to, tokenURI);
        _updatePrice(tokenId, price);
        emit ProductAdded(tokenId, tokenURI, price);
    }

    function updateProductPrice(uint256 tokenId, uint256 price) external onlyIssuerOrOwner(tokenId) {
        _updatePrice(tokenId, price);
    }

    function getTokenDetails(uint256 tokenId) public view returns (TokenDetails memory) {
        uint256 _price = tokenToPrice[tokenId];
        string memory _tokenURI = tokenURI(tokenId);
        return TokenDetails({id: tokenId, price: _price, uri: _tokenURI});
    }
}
