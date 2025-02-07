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
import { Info } from "lucide-react";
import { getFormattedCurrency } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { Fragment } from "react";

export interface ProductCardProps extends React.ComponentProps<typeof Card> {
  name: string;
  description: string;
  imgSrc: string;
  price: bigint;
  listed: boolean;
  isLoading?: boolean;
}

const ProductCard = ({
  name,
  description,
  imgSrc,
  price,
  listed,
  className,
  isLoading = false,
  ...props
}: ProductCardProps) => {
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
          disabled={isLoading}
        >
          {listed ? "Delist" : "List"}
        </Button>
        <Button variant="outline" size="icon" disabled={isLoading}>
          <Info />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
