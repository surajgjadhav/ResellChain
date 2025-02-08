import {
  useReadResellMarketplaceGetListedNfts,
  useReadResellMarketplaceGetMyNfts,
} from "@/generated";
import { GET_LISTED_NFT_INFO } from "@/lib/queryConstants";
import { useQueryClient } from "@tanstack/react-query";

export const useInvalidateNftCach = () => {
  const queryClient = useQueryClient();
  const { queryKey: listedNftKey } = useReadResellMarketplaceGetListedNfts();
  const { queryKey: myNftKey } = useReadResellMarketplaceGetMyNfts();

  const invalidateNftData = () => {
    queryClient.invalidateQueries({ queryKey: listedNftKey });
    queryClient.invalidateQueries({ queryKey: myNftKey });
    queryClient.invalidateQueries({ queryKey: [GET_LISTED_NFT_INFO] });
  };
  const invalidateListedNftData = () => {
    queryClient.invalidateQueries({ queryKey: listedNftKey });
  };
  const invalidateMyNftData = () => {
    queryClient.invalidateQueries({ queryKey: myNftKey });
  };

  return { invalidateNftData, invalidateListedNftData, invalidateMyNftData };
};
