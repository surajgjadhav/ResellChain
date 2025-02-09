import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const nasaEnvSchema = z.object({
    NASA_API_KEY: z.string().min(1, "Nasa API key is required"),
});

export type nasaConfig = z.infer<typeof nasaEnvSchema>;

export async function validateNasaConfig(
    runtime: IAgentRuntime
): Promise<nasaConfig> {
    try {
        const config = {
            NASA_API_KEY: runtime.getSetting("NASA_API_KEY"),
        };
        console.log('config: ', config)
        return nasaEnvSchema.parse(config);
    } catch (error) {
        console.log("error::::", error)
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `Nasa API configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}