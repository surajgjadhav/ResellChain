"use client";
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
import { List } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

const ProductDetails = () => {
  const params = useParams<{ cid: string }>();
  const { cid } = params;

  console.log(cid);

  return (
    <Container>
      <PageHeader>
        <PageHeaderHeading>Resell Product</PageHeaderHeading>
        <PageHeaderDescription>#{cid}</PageHeaderDescription>
      </PageHeader>

      <div className="col-span-full md:col-span-6">
        <AspectRatio ratio={1} className="bg-muted">
          <Image
            src={"/logo.png"}
            alt="mobile"
            fill
            className="h-full w-full rounded-md object-cover"
          />
        </AspectRatio>
      </div>

      <div className="flex flex-col space-y-1.5 md:p-6 col-span-full md:col-span-6">
        <div className="font-semibold leading-none text-lg tracking-tight">
          List
        </div>
        <div className="text-base text-muted-foreground">
          Change your password here. After saving, you&apos;ll be logged out.
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Price</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent>
            <div className="flex flex-row justify-start items-end gap-4 py-2">
              <div className="font-semibold text-3xl tracking-tight">
                1000 USDC
              </div>
              <div className="text-lg text-muted-foreground">$1000</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Buy Now</Button>
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
              <div className=" flex flex-col items-center rounded-md border p-2 bg-blue-100 border-blue-300">
                <div className="font-semibold tracking-tight">Title</div>
                <div className="text-base text-muted-foreground">value</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default ProductDetails;
