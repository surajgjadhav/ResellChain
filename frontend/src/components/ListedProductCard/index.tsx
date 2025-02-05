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

export interface ListedProductCardProps
  extends React.ComponentProps<typeof Card> {
  name: string;
  description: string;
  imgSrc: string;
}

const ListedProductCard = ({
  name,
  description,
  imgSrc,
  className,
  ...props
}: ListedProductCardProps) => {
  return (
    <Card className={className} {...props}>
      <CardHeader>
        <AspectRatio ratio={1} className="bg-muted">
          <Image
            src={imgSrc}
            alt="mobile"
            fill
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="font-semibold text-2xl">$1000</div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Buy Now</Button>
      </CardFooter>
    </Card>
  );
};

export default ListedProductCard;
