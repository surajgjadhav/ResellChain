import { rsMarketplaceAddress } from "@/config/contract";
import { useWriteResellMarketplaceDelistProduct } from "@/generated";
import { useInvalidateNftCach } from "../useInvalidateNftCach";

export const useDelistProduct = () => {
  const { invalidateNftData } = useInvalidateNftCach();

  const { writeContract: delist, isPending: isListingPending } =
    useWriteResellMarketplaceDelistProduct({
      mutation: {
        onSuccess: () => invalidateNftData(),
      },
    });

  const delistProduct = (tokenId: bigint) => {
    console.log("clicked");

    delist({
      address: rsMarketplaceAddress,
      args: [tokenId],
    });
  };

  return {
    delistProduct,
    isLoadingTrx: isListingPending,
  };
};
