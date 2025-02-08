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
import { CalendarIcon, Loader2 } from "lucide-react";
import {
  useReadResellMarketplaceGetMyNfts,
  useWriteResellMarketplaceMintProduct,
} from "@/generated";
import { rsMarketplaceAddress } from "@/config/contract";
import { useEffect, useMemo } from "react";
import { BaseError, useWaitForTransactionReceipt } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import {
  hexToBigInt,
  keccak256,
  toBytes,
  toHex,
  WriteContractErrorType,
} from "viem";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { useToast } from "@/hooks/use-toast";

const MintNftForm = ({
  goToListNft,
}: {
  goToListNft: (tokenId: bigint) => void;
}) => {
  const form = useFormContext<MintNftFormSchema>();
  const { queryKey } = useReadResellMarketplaceGetMyNfts();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutateAsync: uploadImage, isPending: isLoadingUploadImg } =
    usePinataUploadImage();

  const { mutateAsync: uploadMetadata, isPending: isLoadingUploadMetadata } =
    usePinataUploadMetdata();

  const {
    writeContractAsync,
    isPending: isLoadingMint,
    data: trxhash,
  } = useWriteResellMarketplaceMintProduct();

  const {
    isLoading: isConfirming,
    data: receipt,
    status: reciptStatus,
  } = useWaitForTransactionReceipt({
    hash: trxhash,
    confirmations: 1,
  });

  const isLoading = useMemo(
    () =>
      isLoadingUploadImg ||
      isLoadingUploadMetadata ||
      isLoadingMint ||
      isConfirming,
    [isLoadingUploadImg, isLoadingUploadMetadata, isLoadingMint, isConfirming]
  );

  useEffect(() => {
    if (reciptStatus === "success" && !!receipt) {
      console.log("Transaction Receipt:", receipt);

      const eventSignature = keccak256(
        toBytes("ProductMinted(uint256,string,uint256)")
      );

      // Find the ProductMinted event log
      const log = receipt?.logs.find((log) => log.topics[0] === eventSignature);

      const tokenIdHash = log?.topics?.[1] || toHex(0);
      const tokenId = hexToBigInt(tokenIdHash); // Convert from hex
      console.log("Minted Token ID:", tokenId);
      goToListNft(tokenId);
    }
  }, [reciptStatus, receipt]);

  async function onSubmit(data: MintNftFormSchema) {
    try {
      console.log(data);
      const { name, description, image, manufacturer, modelName, price, dom } =
        data;
      const formData = new FormData();
      formData.set("file", image);
      const { ipfsHash } = await uploadImage(formData);
      const metaData: ProductMetadata = {
        name: name,
        description,
        image: `https://ipfs.io/ipfs/${ipfsHash}`,
        attributes: [
          {
            trait_type: "Manufacturer",
            value: manufacturer,
          },
          {
            trait_type: "Model",
            value: modelName,
          },
          {
            trait_type: "Manufacturing Date",
            value: dayjs(dom).format("YYYY-MM-DD"),
          },
        ],
      };
      const { tokenURI } = await uploadMetadata(metaData);
      await writeContractAsync({
        address: rsMarketplaceAddress,
        args: [tokenURI, BigInt(price)],
      });
      queryClient.invalidateQueries({ queryKey });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Unable to send message",
        description:
          (error as BaseError).shortMessage ||
          (error as WriteContractErrorType).message,
      });
    }
  }

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
                    <Input
                      type="number"
                      {...field}
                      onWheel={(e) => e.currentTarget.blur()}
                    />
                  </FormControl>
                  <FormDescription>Price of the product.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dom"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Manufacture</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-auto pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            dayjs(field.value).format("YYYY-MM-DD")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Your date of birth is used to calculate your age.
                  </FormDescription>
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
