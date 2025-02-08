import { GET_LISTED_NFT_INFO, GET_NFT_INFO } from "@/lib/queryConstants";
import { useQuery } from "@tanstack/react-query";
import { ProductMetadata } from "../usePinata";
import { serialize } from "wagmi";

export interface MyNFT {
  tokenId: bigint;
  tokenURI: string;
  seller: `0x${string}`;
  owner: `0x${string}`;
  price: bigint;
  listed: boolean;
}

export interface NftInfo extends MyNFT {
  metadata: ProductMetadata;
}

export interface ProfileInfo {
  nftInfo: NftInfo;
}

const fetchTokenUri = async (tokenURI: MyNFT["tokenURI"]) => {
  const resp = await fetch(tokenURI, { method: "GET" });
  const responseJson = (await resp.json()) as { metadata: ProductMetadata };
  const metadata = responseJson.metadata;
  console.log("metadata: ", metadata);

  return metadata;
};

const getNftMetadata = async (nfts: MyNFT[]) => {
  const fetcdhNftURIs = nfts.map((nft) => fetchTokenUri(nft.tokenURI));
  const metaDatas = await Promise.all(fetcdhNftURIs);
  const nftInfo = metaDatas.map((metaData, index) => {
    return { ...nfts[index], metaData };
  });

  return {
    nftInfo,
  };
};

export const useNftMetadata = ({
  nfts,
  enabled,
}: {
  nfts: MyNFT[];
  enabled: boolean;
}) => {
  console.log("NFTs: ", nfts);
  const queryKey = nfts.map((nft) => serialize({ value: nft.tokenId }));

  return useQuery({
    queryFn: () => getNftMetadata(nfts),
    queryKey: [GET_LISTED_NFT_INFO, queryKey],
    enabled,
  });
};

export const useNftMetadataByUri = ({
  tokenURI,
  enabled,
}: {
  tokenURI: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryFn: () => fetchTokenUri(tokenURI),
    queryKey: [GET_NFT_INFO, tokenURI],
    enabled,
  });
};
