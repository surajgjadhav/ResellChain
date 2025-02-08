import { Address } from "viem";

export const rsTokenAddress = process.env
  .NEXT_PUBLIC_RS_TOKEN_ADDRESS as Address;
export const rsMarketplaceAddress = process.env
  .NEXT_PUBLIC_RS_MARKETPLACE_ADDRESS as Address;
export const usdcAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS as Address;
