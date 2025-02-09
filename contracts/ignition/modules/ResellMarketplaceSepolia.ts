import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import ResellNFTModule from "./ResellNFT";

const PRICE_FEED_HEART_BEAT = 24 * 60 * 60; // 24 hrs

const USDC = "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d";
const USDC_PRICE_FEED = "0x8f016Ce412F264E9ada4B1791a20e1de36efF6BF";

const ResellMarketplaceSepoliaModule = buildModule(
  "ResellMarketplaceSepoliaModule",
  (m) => {
    const { resellNFT } = m.useModule(ResellNFTModule);

    const priceFeedHeartBeat = m.getParameter(
      "priceFeedHeartBeat",
      PRICE_FEED_HEART_BEAT
    );

    const resellMarketplace = m.contract("ResellMarketplace", [
      resellNFT,
      USDC,
      USDC_PRICE_FEED,
      priceFeedHeartBeat,
    ]);

    m.call(resellNFT, "setIssuer", [resellMarketplace]);

    return { resellNFT, resellMarketplace };
  }
);

export default ResellMarketplaceSepoliaModule;
