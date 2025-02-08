import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const resellEnvSchema = z.object({
    RESELL_CONTRACT_ADDRESS: z
        .string()
        .min(1, "Resell Contract Address is required"),
});

export type resellConfig = z.infer<typeof resellEnvSchema>;

export async function validateResellContractConfig(
    runtime: IAgentRuntime
): Promise<resellConfig> {
    try {
        const config = {
            RESELL_CONTRACT_ADDRESS: runtime.getSetting(
                "RESELL_CONTRACT_ADDRESS"
            ),
        };
        console.log("config: ", config);
        return resellEnvSchema.parse(config);
    } catch (error) {
        console.log("error::::", error);
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `Resell contract configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}
