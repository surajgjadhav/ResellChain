"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MintNftForm from "../MintNftForm";
import { useMintNftForm } from "@/hooks/useMintNftForm";
import { FormProvider } from "react-hook-form";
import { useState } from "react";
import {
  useReadErc20Decimals,
  useReadResellMarketplaceGetUsdcPriceInUsd,
} from "@/generated";
import { rsMarketplaceAddress, usdcAddress } from "@/config/contract";
import ListNftForm from "../ListNftForm";

enum ListNftPageState {
  MINT_NFT = "MINT_NFT",
  LIST_NFT = "LIST_NFT",
}

const ListNft = () => {
  const [formState, setFormState] = useState<ListNftPageState>(
    ListNftPageState.MINT_NFT
  );
  const [tokenId, setTokenId] = useState<bigint>(BigInt(0));

  const { data, isLoading } = useReadResellMarketplaceGetUsdcPriceInUsd({
    address: rsMarketplaceAddress,
  });

  const { data: decimals } = useReadErc20Decimals({
    address: usdcAddress,
  });

  console.log("decimals: ", decimals);

  console.log("price: ", isLoading, data);

  const goToListNft = (tokenId: bigint) => {
    setTokenId(tokenId);
    setFormState(ListNftPageState.LIST_NFT);
  };
  const formMethods = useMintNftForm();

  return (
    <Tabs value={formState} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={ListNftPageState.MINT_NFT}>Mint</TabsTrigger>
        <TabsTrigger value={ListNftPageState.LIST_NFT}>List</TabsTrigger>
      </TabsList>
      <TabsContent value={ListNftPageState.MINT_NFT}>
        <FormProvider {...formMethods}>
          <MintNftForm goToListNft={goToListNft} />
        </FormProvider>
      </TabsContent>
      <TabsContent value={ListNftPageState.LIST_NFT}>
        <ListNftForm tokenId={tokenId} />
      </TabsContent>
    </Tabs>
  );
};

export default ListNft;
