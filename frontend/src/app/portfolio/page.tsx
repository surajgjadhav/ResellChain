"use client";

import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import ProfileInfo from "@/components/ProfileInfo";
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
        <PageHeaderHeading>Manage Your Digital Portfolio</PageHeaderHeading>
        <PageHeaderDescription>
          View, track, and control your purchased and listed products in one
          place.
        </PageHeaderDescription>
      </PageHeader>
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Profile Overview</CardTitle>
          <CardDescription>
            View your wallet details, listed products, and resell activity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ProfileInfo
              title="Address:"
              value={address || ""}
              isLoading={isLoading}
            />
            <ProfileInfo
              title="Total Products:"
              value={myNfts?.length || 0}
              isLoading={isLoading}
            />
            <ProfileInfo
              title="Listed Products:"
              value={listedNfts}
              isLoading={isLoading}
            />
          </div>
        </CardContent>
      </Card>

      <div className="col-span-full flex items-stretch flex-col rounded-md border ">
        <CardHeader>
          <CardTitle>Your Digital Assets</CardTitle>
          <CardDescription>
            Manage the products you&apos;ve minted as NFTs.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          {isLoading ? (
            <>
              <ProductCard
                name={""}
                description={""}
                imgSrc={""}
                price={BigInt(0)}
                tokenId={BigInt(0)}
                listed={false}
                isLoading={true}
              />
              <ProductCard
                name={""}
                description={""}
                imgSrc={""}
                price={BigInt(0)}
                tokenId={BigInt(0)}
                listed={false}
                isLoading={true}
              />
              <ProductCard
                name={""}
                description={""}
                imgSrc={""}
                price={BigInt(0)}
                tokenId={BigInt(0)}
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
                  tokenId={tokenId}
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
