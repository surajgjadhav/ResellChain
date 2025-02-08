import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import ResellNFTModule from "./ResellNFT";
import { parseUnits } from "viem";

const USDC_DECIMALS = 6;
const USDC_USD_PRICE = parseUnits("1", USDC_DECIMALS);
const USDC_TRANSFER_AMOUNT = parseUnits("50", USDC_DECIMALS);
const PRICE_FEED_HEART_BEAT = 24 * 60 * 60; // 24 hrs

const MOCK_USDC_SUPPLY: bigint = parseUnits("1000", USDC_DECIMALS);
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

  const priceFeedHeartBeat = m.getParameter(
    "priceFeedHeartBeat",
    PRICE_FEED_HEART_BEAT
  );

  const resellMarketplace = m.contract("ResellMarketplace", [
    resellNFT,
    mockUSDC,
    mockIEOFeedAdapter,
    priceFeedHeartBeat,
  ]);

  m.call(resellNFT, "setIssuer", [resellMarketplace]);

  const user = m.getAccount(1);
  console.log("user: ", user);

  const usdctrfAmt = m.getParameter("amount", USDC_TRANSFER_AMOUNT);

  m.call(mockUSDC, "transfer", [user, usdctrfAmt], { id: "userTrf" });

  return { resellNFT, mockUSDC, mockIEOFeedAdapter, resellMarketplace };
});

export default ResellMarketplaceModule;
