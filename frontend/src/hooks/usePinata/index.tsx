import { UPLOAD_NFT_IMAGE, UPLOAD_NFT_METADATA } from "@/lib/queryConstants";
import { useMutation } from "@tanstack/react-query";

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

export interface UploadImageRes {
  ipfsHash: string;
}

export interface UploadMetadataRes {
  tokenURI: string;
}
export const uploadMetadata = async (
  metdata: ProductMetadata
): Promise<UploadMetadataRes> => {
  try {
    const uploadRequest = await fetch("/api/uploadJSON", {
      method: "POST",
      body: JSON.stringify(metdata),
    });
    const resp = await uploadRequest.json();
    return resp as UploadMetadataRes;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const uploadImage = async (
  formData: FormData
): Promise<UploadImageRes> => {
  try {
    const uploadRequest = await fetch("/api/uploadFile", {
      method: "POST",
      body: formData,
    });
    const resp = await uploadRequest.json();
    return resp as UploadImageRes;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const usePinataUploadMetdata = () => {
  return useMutation({
    mutationFn: (metadata: ProductMetadata) => uploadMetadata(metadata),
    mutationKey: [UPLOAD_NFT_METADATA],
  });
};

export const usePinataUploadImage = () => {
  return useMutation({
    mutationFn: (formData: FormData) => uploadImage(formData),
    mutationKey: [UPLOAD_NFT_IMAGE],
  });
};
