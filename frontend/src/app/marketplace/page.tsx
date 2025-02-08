"use client";
import Container from "@/components/Container";
import ListedProductCard from "@/components/ListedProductCard";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";
import { rsMarketplaceAddress } from "@/config/contract";
import { useReadResellMarketplaceGetListedNfts } from "@/generated";
import { useNftMetadata } from "@/hooks/useNftMetadata";
import { useMemo } from "react";

const Marketplace = () => {
  const { data: myNfts, isFetching: isFetchingNfts } =
    useReadResellMarketplaceGetListedNfts({
      address: rsMarketplaceAddress,
    });

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
        <PageHeaderHeading>Marketplace</PageHeaderHeading>
        <PageHeaderDescription>Buy Products</PageHeaderDescription>
      </PageHeader>

      <div className="col-span-full grid grid-cols-2 md:grid-cols-3 gap-4">
        {isLoading ? (
          <>
            <ListedProductCard
              name={""}
              description={""}
              imgSrc={""}
              price={BigInt(0)}
              tokenId={BigInt(0)}
              isLoading={true}
            />
            <ListedProductCard
              name={""}
              description={""}
              imgSrc={""}
              price={BigInt(0)}
              tokenId={BigInt(0)}
              isLoading={true}
            />
            <ListedProductCard
              name={""}
              description={""}
              imgSrc={""}
              price={BigInt(0)}
              tokenId={BigInt(0)}
              isLoading={true}
            />
          </>
        ) : (
          nftMetadata?.nftInfo?.map(
            ({ tokenId, price, metaData: { name, description, image } }) => (
              <ListedProductCard
                key={tokenId}
                tokenId={tokenId}
                name={name}
                description={description}
                imgSrc={image}
                price={price}
              />
            )
          )
        )}
      </div>
    </Container>
  );
};

export default Marketplace;
