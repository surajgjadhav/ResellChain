import {
    elizaLogger,
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
} from "@elizaos/core";
import { validateNasaConfig } from "../environment";
import { getAPODExamples } from "../examples";
import { createNASAService } from "../services";

export const getAPODAction: Action = {
    name: "NASA_GET_APOD",
    similes: [
        "ASTRONOMY",
        "SPACE",
        "NASA",
        "PLANETS"
    ],
    description: "Get the Nasa Astronomy Picture of the Day.",
    validate: async (runtime: IAgentRuntime) => {
        await validateNasaConfig(runtime);
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {

        const config = await validateNasaConfig(runtime);
        const nasaService = createNASAService(
            config.NASA_API_KEY
        );

        try {
            const APODData = await nasaService.getAPOD();
            elizaLogger.success(
                `Successfully fetched APOD`
            );
            if (callback) {
                callback({
                    text: `Here is the NASA Astronomy Picture of the Day: ${APODData.url}`
                });
                return true;
            }
        } catch (error:any) {
            elizaLogger.error("Error in NASA plugin handler:", error);
            callback({
                text: `Error fetching APOD: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getAPODExamples as ActionExample[][],
} as Action;
