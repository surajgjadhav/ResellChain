"use client";

import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";
import { rsMarketplaceAddress } from "@/config/contract";
import { useReadResellMarketplaceGetMyNfts } from "@/generated";
import { useNftMetadata } from "@/hooks/useNftMetadata";
import { useMemo } from "react";
import { useAccount } from "wagmi";

const Portfolio = () => {
  const { address } = useAccount();

  const { data: myNfts, isFetching: isFetchingNfts } =
    useReadResellMarketplaceGetMyNfts({
      address: rsMarketplaceAddress,
    });
  const listedNfts = useMemo(
    () => (myNfts ? myNfts.filter((nft) => nft.listed).length : 0),
    [myNfts]
  );
  console.log("myNfts: ", isFetchingNfts, myNfts);

  const { data: nftMetadata, isFetching: isFetchingMetadata } = useNftMetadata({
    nfts: [...(myNfts || [])],
    enabled: !!myNfts?.length,
  });

  const isLoading = useMemo(
    () => isFetchingNfts || isFetchingMetadata,
    [isFetchingNfts, isFetchingMetadata]
  );

  return (
    <Container>
      <PageHeader>
        <PageHeaderHeading>Portfolio</PageHeaderHeading>
        <PageHeaderDescription>Your porfolio details</PageHeaderDescription>
      </PageHeader>
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Profile Info</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Address: {address}</p>
          <p>Total Products: {myNfts?.length || 0}</p>
          <p>Listed Products: {listedNfts}</p>
        </CardContent>
      </Card>

      <div className="col-span-full flex items-stretch flex-col rounded-md border ">
        <CardHeader>
          <CardTitle>Your Products</CardTitle>
          <CardDescription>Profile Info</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          {isLoading ? (
            <>
              <ProductCard
                name={""}
                description={""}
                imgSrc={""}
                price={BigInt(0)}
                listed={false}
                isLoading={true}
              />
              <ProductCard
                name={""}
                description={""}
                imgSrc={""}
                price={BigInt(0)}
                listed={false}
                isLoading={true}
              />
              <ProductCard
                name={""}
                description={""}
                imgSrc={""}
                price={BigInt(0)}
                listed={false}
                isLoading={true}
              />
            </>
          ) : (
            nftMetadata?.nftInfo?.map(
              ({
                metaData: { name, image, description },
                tokenId,
                listed,
                price,
              }) => (
                <ProductCard
                  key={tokenId}
                  name={name}
                  description={description}
                  imgSrc={image}
                  price={price}
                  listed={listed}
                />
              )
            )
          )}
        </CardContent>
      </div>
    </Container>
  );
};

export default Portfolio;
