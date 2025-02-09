import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "viem";
import { arbitrumSepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Resell App",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!,
  chains: [arbitrumSepolia], // you can add new chians here by importing thorugh wagmi/chains
  transports: {
    // You can add new chain's RPC config
    [arbitrumSepolia.id]: http("https://sepolia-rollup.arbitrum.io/rpc"),
  },
  ssr: true, // If your dApp uses server side rendering (SSR)
});
