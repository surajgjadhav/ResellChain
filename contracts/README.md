# Resell Chain: Contracts

It contains the smart contracts for the Resell Chain:

- [`ResellMarketplace.sol`](./contracts/ResellMarketplace.sol) - the main contract which handles the marketplace logic
- [`ResellNFT.sol`](./contracts/ResellNFT.sol) - contract to provide Resell product token in ERC-721 format.
- [`IEOFeedAdapter.sol`](./contracts/interfaces/IEOFeedAdapter.sol) - Interface to interact with eOracle Price Feed (EiganLayer AVS)
- [`mocks`](./contracts/mocks/) - this folder contains mock contracts of IEOFeedAdapter and ERC20 to work with local development.

## Supported Network

- Arbitrum Sepolia

All required configuration for supported network is located in the [`hardhat.config.json`](./hardhat.config.json) file in the root of this repository.

## Deployments

Arbitrum Sepolia

- ResellMarketplace contract: [`0x65D527B3D014479626642e07a476864695d8C94A`](https://sepolia.arbiscan.io/address/0x65D527B3D014479626642e07a476864695d8C94A)
- ResellNFT contract: [`0xa3B38c61D8974577e27113644Dc558Cb7e05ddA6`](https://sepolia.arbiscan.io/address/0xa3B38c61D8974577e27113644Dc558Cb7e05ddA6)

## About EigenLayer AVS

- [EigenLayer AVS](https://avsecosystem.eigenlayer.xyz/)
- [eOracle Price Feeds](https://docs.eoracle.io/docs/eoracle-price-feeds/feed-addresses)
