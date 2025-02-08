import { rsMarketplaceAddress, rsTokenAddress } from "@/config/contract";
import {
  useWriteResellMarketplaceListProduct,
  useWriteResellNftApprove,
} from "@/generated";
import { useMemo } from "react";
import { useInvalidateNftCach } from "../useInvalidateNftCach";
import { useToast } from "../use-toast";
import { BaseError, WriteContractErrorType } from "viem";

export const useListProduct = () => {
  const { toast } = useToast();
  const { invalidateNftData } = useInvalidateNftCach();
  const { writeContractAsync: approve, isPending: isApprovalPending } =
    useWriteResellNftApprove();
  const { writeContractAsync: list, isPending: isListingPending } =
    useWriteResellMarketplaceListProduct({
      mutation: {
        onSuccess: () => invalidateNftData(),
      },
    });

  const isLoadingTrx = useMemo(
    () => isApprovalPending || isListingPending,
    [isApprovalPending || isListingPending]
  );

  const listProduct = async (tokenId: bigint) => {
    console.log("clicked");

    try {
      await approve({
        address: rsTokenAddress,
        args: [rsMarketplaceAddress, tokenId],
      });

      await list({
        address: rsMarketplaceAddress,
        args: [tokenId],
      });
    } catch (error) {
      console.log("error: ", error);
      console.log(
        "message: ",
        (error as BaseError).shortMessage ||
          (error as WriteContractErrorType).message
      );

      toast({
        variant: "destructive",
        title: "Unable to send message",
        description:
          (error as BaseError).shortMessage ||
          (error as WriteContractErrorType).message,
      });
    }
  };

  return {
    listProduct,
    isLoadingTrx,
  };
};
