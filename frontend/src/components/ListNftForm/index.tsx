import { useListProduct } from "@/hooks/useListProduct";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import { RoutePathEnum } from "@/enums/RoutePaths";

const ListNftForm = ({ tokenId }: { tokenId: bigint }) => {
  const { listProduct, isLoadingTrx: isLoadingTx } = useListProduct();
  const router = useRouter();
  const onList = () => {
    listProduct(tokenId).then(() => router.push(RoutePathEnum.MARKETPLACE));
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>List Product</CardTitle>
        <CardDescription>List Your Product to Marketplace.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="current">Token Id</Label>
          <Input
            id="current"
            type="text"
            disabled
            value={tokenId?.toString(10)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onList} disabled={isLoadingTx}>
          List Product
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ListNftForm;
