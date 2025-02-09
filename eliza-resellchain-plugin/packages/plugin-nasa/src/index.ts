import { Plugin } from "@elizaos/core";
import { getAPODAction } from "./actions/getAPOD";
import { getMarsRoverAction } from "./actions/getMarsRoverPhoto";

export const nasaPlugin: Plugin = {
    name: "nasa",
    description: "NASA plugin for Eliza",
    actions: [getAPODAction, getMarsRoverAction],
    // evaluators analyze the situations and actions taken by the agent. they run after each agent action
    // allowing the agent to reflect on what happened and potentially trigger additional actions or modifications
    evaluators: [],
    // providers supply information and state to the agent's context, help agent access necessary data
    providers: [],
};
export default nasaPlugin;