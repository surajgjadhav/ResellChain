import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { getFormattedCurrency } from "@/lib/utils";
import Link from "next/link";
import { RoutePathEnum } from "@/enums/RoutePaths";

export interface ListedProductCardProps
  extends React.ComponentProps<typeof Card> {
  tokenId: bigint;
  name: string;
  description: string;
  imgSrc: string;
  price: bigint;
  isLoading?: boolean;
}

const ListedProductCard = ({
  tokenId,
  name,
  description,
  imgSrc,
  price,
  className,
  isLoading = false,
  ...props
}: ListedProductCardProps) => {
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
      <CardFooter>
        <Button className="w-full" disabled={isLoading} asChild>
          <Link href={`${RoutePathEnum.MARKETPLACE}/${tokenId}`}>Buy Now </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ListedProductCard;
