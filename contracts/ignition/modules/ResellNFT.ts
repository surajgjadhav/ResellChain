import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ResellNFTModule = buildModule("ResellNFTModule", (m) => {
  const resellNFT = m.contract("ResellNFT");

  return { resellNFT };
});

export default ResellNFTModule;
