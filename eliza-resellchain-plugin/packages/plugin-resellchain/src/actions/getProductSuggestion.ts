import {
    elizaLogger,
    Action,
    ActionExample,
    generateObject,
    HandlerCallback,
    composeContext,
    IAgentRuntime,
    Memory,
    State,
    ModelClass,
    generateText,
} from "@elizaos/core";
import { validateResellContractConfig } from "../environment";
import { getProductSuggestionExamples } from "../examples";
import { createResellChainService } from "../services";
import { resellProductSuggestionTemplate } from "../template";
import { z } from "zod";

export const getProductSuggestionAction: Action = {
    name: "RESELL_GET_PRODUCTS",
    similes: [
        "SUGGEST_PRODUCT",
        "PRODUCT_SEGGESTION",
        "PRODUCT_HELP",
        "RESEL_PRODUCT_SUGGESTION",
    ],
    description: "Get the ResellProduct Suggestion.",
    validate: async (runtime: IAgentRuntime) => {
        await validateResellContractConfig(runtime);
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        const config = await validateResellContractConfig(runtime);
        const resellService = createResellChainService(
            config.RESELL_CONTRACT_ADDRESS
        );

        try {
            const productList = await resellService.getAllProducts();
            const state = await runtime.composeState(message);

            // Compose transfer context
            const context = composeContext({
                state: {
                    ...state,
                    productList,
                    userMessage: message.content.text,
                },
                template: resellProductSuggestionTemplate,
            });

            const text = await generateText({
                runtime,
                context,
                modelClass: ModelClass.LARGE,
            });

            elizaLogger.log("Resell Agent Resp: ", text);

            elizaLogger.success(`Successfully fetched products`);
            if (callback) {
                callback({
                    text,
                });
                return true;
            }
        } catch (error: any) {
            elizaLogger.error("Error in ResellChain plugin handler:", error);
            callback({
                text: `Error fetching Resell Products: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getProductSuggestionExamples as ActionExample[][],
} as Action;
