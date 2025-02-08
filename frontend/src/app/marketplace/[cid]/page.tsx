"use client";
import Container from "@/components/Container";
import TraitInfo from "@/components/TraitInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { rsMarketplaceAddress } from "@/config/contract";
import {
  useReadResellMarketplaceGetNftDetails,
  useReadResellMarketplaceGetValuationInUsdc,
} from "@/generated";
import { useNftMetadataByUri } from "@/hooks/useNftMetadata";
import { formatUSDC, getFormattedCurrency } from "@/lib/utils";
import { List } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import PageSkeleton from "./skeleton";
import { useBuyProduct } from "@/hooks/useBuyProduct";

const ProductDetails = () => {
  const params = useParams<{ cid: string }>();
  const { cid } = params;

  console.log(cid);

  const { data: tokenDetails, isPending: isLoadingTokenDetails } =
    useReadResellMarketplaceGetNftDetails({
      address: rsMarketplaceAddress,
      args: [BigInt(cid)],
    });

  const { data: tokenPriceUsdc, isPending: isLoadingTokenPriceUsdc } =
    useReadResellMarketplaceGetValuationInUsdc({
      address: rsMarketplaceAddress,
      args: [BigInt(cid)],
    });

  const { data: metaData, isPending: isLoadingMetaData } = useNftMetadataByUri({
    tokenURI: tokenDetails?.tokenURI || "",
    enabled: !!tokenDetails?.tokenURI,
  });

  const { buyProduct, isLoadingTrx } = useBuyProduct();

  const isLoading = useMemo(
    () => isLoadingTokenDetails || isLoadingMetaData || isLoadingTokenPriceUsdc,
    [isLoadingTokenDetails, isLoadingMetaData, isLoadingTokenPriceUsdc]
  );

  console.log("tokenPriceUsdc: ", tokenPriceUsdc);
  console.log("tokenDetails: ", tokenDetails);

  const onBuy = () => {
    if (!!cid && !!tokenPriceUsdc) {
      buyProduct(BigInt(cid), tokenPriceUsdc);
    }
  };

  if (isLoading) {
    return <PageSkeleton cid={cid} />;
  }

  return (
    <Container>
      <PageHeader>
        <PageHeaderHeading>Resell Product</PageHeaderHeading>
        <PageHeaderDescription>#{cid}</PageHeaderDescription>
      </PageHeader>

      <div className="col-span-full md:col-span-6">
        <AspectRatio ratio={1} className="bg-muted">
          {isLoading ? (
            <Skeleton className="h-full w-full rounded-md object-cover" />
          ) : (
            <Image
              src={metaData?.image || ""}
              alt="product image"
              fill
              className="h-full w-full rounded-md object-cover"
            />
          )}
        </AspectRatio>
      </div>

      <div className="flex flex-col space-y-1.5 md:p-6 col-span-full md:col-span-6">
        <div className="font-semibold leading-none text-lg tracking-tight">
          {metaData?.name}
        </div>
        <div className="text-base text-muted-foreground">
          {metaData?.description}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Price</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent>
            <div className="flex flex-row justify-start items-end gap-4 py-2">
              <div className="font-semibold text-3xl tracking-tight">
                {tokenPriceUsdc ? formatUSDC(tokenPriceUsdc) : 0} USDC
              </div>
              <div className="text-lg text-muted-foreground">
                {getFormattedCurrency(tokenDetails?.price || 0)}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              disabled={isLoading || !tokenDetails?.listed || isLoadingTrx}
              onClick={onBuy}
            >
              Buy Now
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="col-span-full md:col-span-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-row items-center gap-2">
              <List /> Traits
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {metaData?.attributes.map(({ trait_type, value }) => (
                <TraitInfo key={trait_type} title={trait_type} value={value} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default ProductDetails;
