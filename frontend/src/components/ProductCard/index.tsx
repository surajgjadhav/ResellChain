"use client";
import { RoutePathEnum } from "@/enums/RoutePaths";
import { useDelistProduct } from "@/hooks/useDelistProduct";
import { useListProduct } from "@/hooks/useListProduct";
import { getFormattedCurrency } from "@/lib/utils";
import { Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export interface ProductCardProps extends React.ComponentProps<typeof Card> {
  tokenId: bigint;
  name: string;
  description: string;
  imgSrc: string;
  price: bigint;
  listed: boolean;
  isLoading?: boolean;
}

const ProductCard = ({
  tokenId,
  name,
  description,
  imgSrc,
  price,
  listed,
  className,
  isLoading = false,
  ...props
}: ProductCardProps) => {
  const { listProduct, isLoadingTrx: isLoadinglist } = useListProduct();
  const { delistProduct, isLoadingTrx: isLoadingDelist } = useDelistProduct();

  const isLoadingTransaction = isLoadinglist || isLoadingDelist;

  const onClickButton = () => {
    if (listed) {
      delistProduct(tokenId);
    } else {
      listProduct(tokenId);
    }
  };

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <AspectRatio ratio={1} className="bg-muted">
          {isLoading ? (
            <Skeleton className="h-full w-full rounded-md object-cover" />
          ) : (
            <Image
              src={imgSrc}
              alt="mobile"
              fill
              className="h-full w-full rounded-md object-cover"
            />
          )}
        </AspectRatio>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        ) : (
          <>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <div className="font-semibold text-2xl">
              {getFormattedCurrency(price)}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <Button
          className="grow"
          variant={listed ? "destructive" : "default"}
          disabled={isLoading || isLoadingTransaction}
          onClick={onClickButton}
        >
          {listed ? "Delist" : "List"}
        </Button>
        <Button
          variant="outline"
          size="icon"
          disabled={isLoading || isLoadingTransaction}
          asChild
        >
          <Link href={`${RoutePathEnum.MARKETPLACE}/${tokenId}`}>
            <Info />{" "}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
