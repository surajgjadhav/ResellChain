import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "viem";
import { hardhat } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Resell App",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!,
  chains: [hardhat], // you can add new chians here by importing thorugh wagmi/chains
  transports: {
    // You can add new chain's RPC config
    // [optimismSepolia.id]: http("https://sepolia.optimism.io/"),
    [hardhat.id]: http("http://127.0.0.1:8545/"),
  },
  ssr: true, // If your dApp uses server side rendering (SSR)
});
