import { ActionExample } from "@elizaos/core";


export const getProductSuggestionExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "can you suggest me a phone to buy?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me get the best resell product for you:",
                action: "RESELL_GET_PRODUCTS",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I love cars.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Oh really, then let me get the best car from our Resell Chain...",
                action: "RESELL_GET_PRODUCTS",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I want to buy a Phone.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Sure, I will suggest the best product for you. can you help with the more details like  ?",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "yes",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Here is the product.",
                action: "RESELL_GET_PRODUCTS",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Samsung phones are superfast now a days.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Indeed! Would you like to see phones from our Resell Chain?",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "yes",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Here is the Phone that you want.",
                action: "RESELL_GET_PRODUCTS",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I'm a big fan of iPhone.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Would you like to see the iPhone for you from Resell Chain?",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "yes",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Here is the Best iPhone for you.",
                action: "RESELL_GET_PRODUCTS",
            },
        }
    ]
];