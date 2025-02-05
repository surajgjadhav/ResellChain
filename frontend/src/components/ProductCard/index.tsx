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

export interface ProductCardProps extends React.ComponentProps<typeof Card> {
  name: string;
  description: string;
  imgSrc: string;
}

const ProductCard = ({
  name,
  description,
  imgSrc,
  className,
  ...props
}: ProductCardProps) => {
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
      <CardFooter className="flex items-center gap-2">
        <Button className="grow">List</Button>
        <Button variant="outline" size="icon">
          <Info />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
