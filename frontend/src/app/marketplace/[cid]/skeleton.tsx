import Container from "@/components/Container";
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
import { List } from "lucide-react";

const PageSkeleton = ({ cid }: { cid: string }) => {
  return (
    <Container>
      <PageHeader>
        <PageHeaderHeading>Resell Product</PageHeaderHeading>
        <PageHeaderDescription>#{cid}</PageHeaderDescription>
      </PageHeader>

      <div className="col-span-full md:col-span-6">
        <AspectRatio ratio={1} className="bg-muted">
          <Skeleton className="h-full w-full rounded-md object-cover" />
        </AspectRatio>
      </div>

      <div className="flex flex-col space-y-1.5 md:p-6 col-span-full md:col-span-6">
        <Skeleton className="h-7 w-10" />
        <Skeleton className="h-6 w-20" />

        <Card>
          <CardHeader>
            <CardTitle>Price</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent>
            <div className="flex flex-row justify-start items-end gap-4 py-2">
              <div className="font-semibold text-3xl tracking-tight">
                <Skeleton className="h-9 w-10" /> USDC
              </div>
              <Skeleton className="h-6 w-10" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled>
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
              <Skeleton className="h-20 w-40" />
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default PageSkeleton;
