import { Plugin } from "@elizaos/core";
import { getProductSuggestionAction } from "./actions/getProductSuggestion";

export const resellPlugin: Plugin = {
    name: "resell",
    description: "Resell Chain plugin for product suggestion on eliza",
    actions: [getProductSuggestionAction],
    evaluators: [],
    providers: [],
};
export default resellPlugin;
