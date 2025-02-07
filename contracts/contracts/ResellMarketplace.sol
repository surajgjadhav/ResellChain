// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ResellNFT} from "./ResellNFT.sol";
import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IEOFeedAdapter} from "./interfaces/IEOFeedAdapter.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";

contract ResellMarketplace is Ownable, IERC721Receiver, ReentrancyGuard {
    /**
     * Errors
     */
    error ResellMarketplace__OnlyOwnerCanListProduct();
    error ResellMarketplace__OnlyResellTokenSupported();
    error ResellMarketplace__InvalidRoundId();
    error ResellMarketplace__PriceFeedDdosed();
    error ResellMarketplace__StalePriceFeed();

    struct NFTDetails {
        uint256 tokenId;
        string tokenURI;
        address seller;
        address owner;
        uint256 price;
        bool listed;
    }

    ResellNFT internal immutable i_resellNFT;
    IERC20 internal immutable i_usdc;
    IEOFeedAdapter internal s_usdcUsdPF;
    uint256 private constant USDC_DECIMALS = 6; // USDC uses 6 decimals

    mapping(uint256 id => NFTDetails details) private s_idToNftDt;
    uint256 private s_nftsCount;
    uint256 private s_nftsListed;
    uint256 private s_nftsSold;
    uint256 private s_usdcUsdFeedHeartbeat;

    /**
     * Events
     */
    event ProductMinted(uint256 indexed tokenId, string tokenURI, uint256 price);
    event ProductListed(uint256 indexed tokenId, string tokenURI, address seller, address owner, uint256 price);
    event ProductSold(uint256 indexed tokenId, string tokenURI, address seller, address owner, uint256 price);

    constructor(address rtNFT, address usdc, address usdcUsdPF, uint32 pricefeedHeartbeat) Ownable(msg.sender) {
        i_resellNFT = ResellNFT(rtNFT);
        i_usdc = IERC20(usdc);
        s_usdcUsdPF = IEOFeedAdapter(usdcUsdPF);
        s_usdcUsdFeedHeartbeat = pricefeedHeartbeat;
    }

    /**
     * Modifiers
     */
    modifier onlyTokenOwner(uint256 _tokenId) {
        if (s_idToNftDt[_tokenId].owner != msg.sender) {
            revert ResellMarketplace__OnlyOwnerCanListProduct();
        }
        _;
    }

    function setUsdcUsdPriceFeedDetails(address usdcUsdAggregatorAddress, uint256 usdcUsdFeedHeartbeat)
        external
        onlyOwner
    {
        s_usdcUsdPF = IEOFeedAdapter(usdcUsdAggregatorAddress);
        s_usdcUsdFeedHeartbeat = usdcUsdFeedHeartbeat;
    }

    function mintAndListProduct(string memory tokenURI, uint256 price)
        external
        returns (ResellNFT.TokenDetails memory tokenDetails)
    {
        uint256 tokenId = mintProduct(tokenURI, price);
        listProduct(tokenId);
        tokenDetails = ResellNFT.TokenDetails({id: tokenId, uri: tokenURI, price: price});
    }

    function updateProductPrice(uint256 tokenId, uint256 price) external {
        i_resellNFT.updateProductPrice(tokenId, price);
    }

    function delistProduct(uint256 tokenId) external onlyTokenOwner(tokenId) {
        s_nftsListed--;
        s_idToNftDt[tokenId].listed = false;
        i_resellNFT.safeTransferFrom(address(this), msg.sender, tokenId);
    }

    function mintProduct(string memory tokenURI, uint256 price) public returns (uint256 tokenId) {
        s_nftsCount++;
        tokenId = i_resellNFT.mintAndUpdateProductPrice(msg.sender, tokenURI, price);
        s_idToNftDt[tokenId] = NFTDetails(tokenId, tokenURI, address(this), msg.sender, price, false);
        emit ProductMinted(tokenId, tokenURI, price);
    }

    function listProduct(uint256 tokenId)
        public
        onlyTokenOwner(tokenId)
        returns (ResellNFT.TokenDetails memory tokenDetails)
    {
        s_nftsListed++;
        tokenDetails = i_resellNFT.getTokenDetails(tokenId);
        s_idToNftDt[tokenId].listed = true;
        i_resellNFT.transferFrom(msg.sender, address(this), tokenId);
        emit ProductListed(tokenDetails.id, tokenDetails.uri, address(this), msg.sender, tokenDetails.price);
    }

    function getMyNfts() public view returns (NFTDetails[] memory) {
        uint256 nftCount = s_nftsCount;
        uint256 myNftCount = 0;
        for (uint256 i = 0; i < nftCount; i++) {
            if (s_idToNftDt[i + 1].owner == msg.sender) {
                myNftCount++;
            }
        }

        NFTDetails[] memory nfts = new NFTDetails[](myNftCount);
        uint256 nftsIndex = 0;
        NFTDetails memory nftDetails;
        for (uint256 i = 0; i < nftCount; i++) {
            nftDetails = s_idToNftDt[i + 1];
            if (nftDetails.owner == msg.sender) {
                nfts[nftsIndex] = nftDetails;
                nftsIndex++;
            }
        }
        return nfts;
    }

    function getListedNfts() public view returns (NFTDetails[] memory) {
        uint256 nftCount = s_nftsCount;
        uint256 listedNftCount = s_nftsListed;

        NFTDetails[] memory nfts = new NFTDetails[](listedNftCount);
        uint256 nftsIndex = 0;
        NFTDetails memory nftDetails;
        for (uint256 i = 0; i < nftCount; i++) {
            nftDetails = s_idToNftDt[i + 1];
            if (nftDetails.listed) {
                nfts[nftsIndex] = nftDetails;
                nftsIndex++;
            }
        }
        return nfts;
    }

    function getUsdcPriceInUsd() public view returns (uint256) {
        uint80 _roundId;
        int256 _price;
        uint256 _updatedAt;
        try s_usdcUsdPF.latestRoundData() returns (
            uint80 roundId,
            int256 price,
            uint256,
            /* startedAt */
            uint256 updatedAt,
            uint80 /* answeredInRound */
        ) {
            _roundId = roundId;
            _price = price;
            _updatedAt = updatedAt;
        } catch {
            revert ResellMarketplace__PriceFeedDdosed();
        }

        if (_roundId == 0) revert ResellMarketplace__InvalidRoundId();

        if (_updatedAt < block.timestamp - s_usdcUsdFeedHeartbeat) {
            revert ResellMarketplace__StalePriceFeed();
        }

        return uint256(_price);
    }

    function getValuationInUsdc(uint256 tokenId) public view returns (uint256) {
        uint256 valuation = i_resellNFT.getTokenPrice(tokenId);

        uint256 usdcPrice = getUsdcPriceInUsd();

        uint256 feedDecimals = s_usdcUsdPF.decimals();

        uint256 valuationInUsdc = Math.mulDiv((valuation * usdcPrice), 10 ** USDC_DECIMALS, 10 ** feedDecimals); // Adjust the valuation from USD (1e8) to USDC (1e6)

        return valuationInUsdc;
    }

    function onERC721Received(address operator, address from, uint256 tokenId, bytes memory data)
        public
        override
        nonReentrant
        returns (bytes4)
    {
        if (msg.sender != address(i_resellNFT)) {
            revert ResellMarketplace__OnlyResellTokenSupported();
        }
        return this.onERC721Received.selector;
    }
}
