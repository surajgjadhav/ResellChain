import { rsMarketplaceAddress, usdcAddress } from "@/config/contract";
import {
  useWriteErc20Approve,
  useWriteResellMarketplaceBuy,
} from "@/generated";
import { useMemo } from "react";
import { useInvalidateNftCach } from "../useInvalidateNftCach";
import { useToast } from "../use-toast";
import { WriteContractErrorType } from "viem";
import { BaseError } from "wagmi";

export const useBuyProduct = () => {
  const { toast } = useToast();
  const { invalidateNftData } = useInvalidateNftCach();
  const { writeContractAsync: approve, isPending: isApprovalPending } =
    useWriteErc20Approve();
  const { writeContractAsync: buy, isPending: isBuyingPending } =
    useWriteResellMarketplaceBuy({
      mutation: {
        onSuccess: () => invalidateNftData(),
      },
    });

  const isLoadingTrx = useMemo(
    () => isApprovalPending || isBuyingPending,
    [isApprovalPending, isBuyingPending]
  );

  const buyProduct = async (tokenId: bigint, amount: bigint) => {
    console.log("clicked");

    try {
      await approve({
        address: usdcAddress,
        args: [rsMarketplaceAddress, amount],
      });

      await buy({
        address: rsMarketplaceAddress,
        args: [tokenId, amount],
      });
    } catch (error) {
      console.log("error: ", error);

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
    buyProduct,
    isLoadingTrx,
  };
};
