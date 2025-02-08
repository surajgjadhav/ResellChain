import { createPublicClient, http, parseAbi } from "viem";
import { hardhat } from "viem/chains";

// Set up Viem client (use your chain's RPC URL)
const client = createPublicClient({
    chain: hardhat,
    transport: http("http://127.0.0.1:8545/"), // Replace with your RPC
});

// Contract details
const abi = parseAbi([
    "function getListedNfts() public view returns (NFTDetails[] memory)",
    "struct NFTDetails { uint256 tokenId; string tokenURI;address seller; address owner; uint256 price; bool listed;}",
]);
interface Product {
    tokenId: bigint;
    tokenURI: string;
    seller: `0x${string}`;
    owner: `0x${string}`;
    price: bigint;
    listed: boolean;
}
[];

export interface ProductAttributes {
    trait_type: string;
    value: string | number;
}

export interface ProductMetadata {
    name: string;
    description: string;
    image: string;
    attributes: ProductAttributes[];
}

export interface ProductInfo extends Product {
    metadata: ProductMetadata;
}

const fetchTokenUri = async (tokenURI: Product["tokenURI"]) => {
    const resp = await fetch(tokenURI, { method: "GET" });
    const responseJson = (await resp.json()) as { metadata: ProductMetadata };
    const metadata = responseJson.metadata;
    console.log("metadata: ", metadata);

    return metadata;
};

const getNftMetadata = async (nfts: Product[]) => {
    const fetcdhNftURIs = nfts.map((nft) => fetchTokenUri(nft.tokenURI));
    const metaDatas = await Promise.all(fetcdhNftURIs);
    const nftInfo = metaDatas.map((metaData, index) => {
        return { ...nfts[index], metaData };
    });

    return nftInfo;
};

export const createResellChainService = (contractAddress: string) => {
    const getAllProducts = async (): Promise<string> => {
        try {
            const _products = await client.readContract({
                address: contractAddress as `0x${string}`,
                abi,
                functionName: "getListedNfts",
            });

            const products = (_products ? [..._products] : []) as Product[];

            const productsInfo = await getNftMetadata(products);

            const resellProducts = productsInfo.map(
                ({
                    tokenId,
                    price,
                    metaData: { name, description, image, attributes },
                }) =>
                    `Token ID: ${tokenId} - name of the the resell product: ${name} - description of the product: ${description} - price in USD: ${price} - Product Image: ${image} - specifications: ${attributes.toString()}`
            );
            return resellProducts.join("\n");
        } catch (error) {
            console.error("Error fetching products:", error);
            return "Due to Technical issues, unable to fetch products now. Sorry for inconvenience. Please try after some time";
        }
    };

    return { getAllProducts };
};
