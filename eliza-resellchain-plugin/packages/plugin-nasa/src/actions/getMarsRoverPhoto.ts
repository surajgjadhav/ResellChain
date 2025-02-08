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
import { getMarsRoverExamples } from "../examples";
import { createNASAService } from "../services";

export const getMarsRoverAction: Action = {
    name: "NASA_GET_MARS_ROVER_PHOTO",
    similes: [
        "MARS",
        "MARTIAN",
        "MARS PHOTO"
    ],
    description: "Get a random Nasa Mars Rover Photo.",
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
            const MarsRoverData = await nasaService.getMarsRoverPhoto();
            elizaLogger.success(
                `Successfully fetched Mars Rover Photo`
            );
            if (callback) {
                callback({
                    text: `
                    Here is a photo from the ${MarsRoverData.rover} on day ${MarsRoverData.sol} from the ${MarsRoverData.camera} camera.

                    ${MarsRoverData.photo}
                    `
                });
                return true;
            }
        } catch (error:any) {
            elizaLogger.error("Error in NASA plugin handler:", error);
            callback({
                text: `Error fetching Mars Rover Photo: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getMarsRoverExamples as ActionExample[][],
} as Action;
