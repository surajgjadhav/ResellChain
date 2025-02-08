"server only";
import { PinataSDK } from "pinata-web3";

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.NEXT_PINATA_JWT}`,
  pinataGateway: `${process.env.NEXT_PINATA_GATEWAY_URL}`,
});
