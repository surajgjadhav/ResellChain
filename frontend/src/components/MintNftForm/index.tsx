import { MintNftFormSchema } from "@/hooks/useMintNftForm";
import { useFormContext } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  ProductMetadata,
  usePinataUploadImage,
  usePinataUploadMetdata,
} from "@/hooks/usePinata";
import { Loader2 } from "lucide-react";
import { useWriteResellMarketplaceMintProduct } from "@/generated";
import { rsMarketplaceAddress } from "@/config/contract";
import { useEffect, useMemo } from "react";
import { BaseError, useWaitForTransactionReceipt } from "wagmi";

const MintNftForm = ({ goToListNft }: { goToListNft: () => void }) => {
  const form = useFormContext<MintNftFormSchema>();

  const {
    mutateAsync: uploadImage,
    isPending: isLoadingUploadImg,
    isError: isErrorUploadError,
  } = usePinataUploadImage();
  const {
    mutateAsync: uploadMetadata,
    isPending: isLoadingUploadMetadata,
    isError: isErrorUploadingMetadata,
  } = usePinataUploadMetdata();
  const {
    writeContract,
    isPending: isLoadingMint,
    status: mintProductStatus,
    data: trxhash,
    error,
  } = useWriteResellMarketplaceMintProduct();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data,
  } = useWaitForTransactionReceipt({
    hash: trxhash,
  });

  console.log("isLoadingMint: ", isLoadingMint, data);

  const isLoading = useMemo(
    () => isLoadingUploadImg || isLoadingUploadMetadata || isLoadingMint,
    [isLoadingUploadImg, isLoadingUploadMetadata, isLoadingMint]
  );

  async function onSubmit(data: MintNftFormSchema) {
    console.log(data);
    const { name, description, image, manufacturer, modelName, price } = data;
    const formData = new FormData();
    formData.set("file", image);
    const { ipfsHash } = await uploadImage(formData);
    const metaData: ProductMetadata = {
      name: name,
      description,
      image: `https://ipfs.io/ipfs/${ipfsHash}`,
      attributes: [
        {
          trait_type: "manufacturer",
          value: manufacturer,
        },
        {
          trait_type: "model",
          value: modelName,
        },
      ],
    };
    const { tokenURI } = await uploadMetadata(metaData);
    writeContract({
      address: rsMarketplaceAddress,
      args: [tokenURI, BigInt(price)],
    });
  }

  useEffect(() => {
    if (mintProductStatus === "success") {
      // goToListNft();
    }
  }, [mintProductStatus]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mint NFT</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you&apos;re done.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          method="POST"
          action=""
          className="space-y-8"
        >
          <CardContent className="space-y-2">
            {error && (
              <p className="text-sm font-medium text-destructive">
                Error: {(error as BaseError).shortMessage || error.message}
              </p>
            )}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your product&apos;s display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="description" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your product&apos;s display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => {
                        console.log("e.target.files: ", e.target.files);

                        const file = e.target.files?.[0];
                        if (file) {
                          onChange(file);
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>Image of your product.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="manufacturer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manufacturer</FormLabel>
                  <FormControl>
                    <Input placeholder="manufacturer" {...field} />
                  </FormControl>
                  <FormDescription>
                    Name of the product manufacturer.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="modelName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Model name" {...field} />
                  </FormControl>
                  <FormDescription>Name of the product model.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>Price of the product.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin" />}
              Mint NFT
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default MintNftForm;
