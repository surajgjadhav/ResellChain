import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import ResellNFTModule from "./ResellNFT";
import { parseUnits } from "viem";

const USDC_DECIMALS = 6;
const USDC_USD_PRICE = parseUnits("1", USDC_DECIMALS);

const MOCK_USDC_SUPPLY: bigint = BigInt(1000);
const USDC = "USDC";

const ResellMarketplaceModule = buildModule("ResellMarketplaceModule", (m) => {
  const { resellNFT } = m.useModule(ResellNFTModule);

  const name = m.getParameter("name", USDC);
  const symbol = m.getParameter("symbol", USDC);
  const totalSupply = m.getParameter("totalSupply", MOCK_USDC_SUPPLY);
  const mockUSDC = m.contract("MockERC20", [name, symbol, totalSupply]);

  const decimals = m.getParameter("decimals", USDC_DECIMALS);
  const initialAnswer = m.getParameter("initialAnswer", USDC_USD_PRICE);
  const mockIEOFeedAdapter = m.contract("MockIEOFeedAdapter", [
    decimals,
    initialAnswer,
  ]);

  const resellMarketplace = m.contract("ResellMarketplace", [
    resellNFT,
    mockUSDC,
    mockIEOFeedAdapter,
  ]);

  return { resellNFT, mockUSDC, mockIEOFeedAdapter, resellMarketplace };
});

export default ResellMarketplaceModule;
