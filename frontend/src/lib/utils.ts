import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

dayjs.extend(localizedFormat);

export const moment = dayjs;

export const formatAgentName = (name: string) => {
  return name.substring(0, 2);
};

export const getFormattedCurrency = (amount: number | bigint) => {
  const CurrencyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return CurrencyFormat.format(amount);
};

export const formatUSDC = (amount: bigint) => {
  const usdcPrecision = BigInt(1000000);
  const integerPart = amount / usdcPrecision;
  const fractionalPart = amount % usdcPrecision;

  const localizedInteger = integerPart.toLocaleString("en-US");
  const formattedFraction = fractionalPart
    .toString()
    .padStart(6, "0")
    .slice(0, 2);

  return `${localizedInteger}.${formattedFraction}`;
};
