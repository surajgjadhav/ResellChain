"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MintNftForm from "../MintNftForm";
import { useMintNftForm } from "@/hooks/useMintNftForm";
import { FormProvider } from "react-hook-form";
import { useState } from "react";
import { useReadResellMarketplaceGetUsdcPriceInUsd } from "@/generated";
import { rsMarketplaceAddress } from "@/config/contract";

enum ListNftFormState {
  MINT_NFT = "MINT_NFT",
  LIST_NFT = "LIST_NFT",
}

export function ListNftForm() {
  const [formState, setFormState] = useState<ListNftFormState>(
    ListNftFormState.MINT_NFT
  );

  const { data, isLoading } = useReadResellMarketplaceGetUsdcPriceInUsd({
    address: rsMarketplaceAddress,
  });

  console.log("price: ", isLoading, data);

  const goToListNft = () => setFormState(ListNftFormState.LIST_NFT);
  const formMethods = useMintNftForm();

  return (
    <Tabs value={formState} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={ListNftFormState.MINT_NFT}>Mint</TabsTrigger>
        <TabsTrigger value={ListNftFormState.LIST_NFT}>List</TabsTrigger>
      </TabsList>
      <TabsContent value={ListNftFormState.MINT_NFT}>
        <FormProvider {...formMethods}>
          <MintNftForm goToListNft={goToListNft} />
        </FormProvider>
      </TabsContent>
      <TabsContent value={ListNftFormState.LIST_NFT}>
        <Card>
          <CardHeader>
            <CardTitle>List</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged
              out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>List Product</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
