export const resellProductSuggestionTemplate = `Given the listed resell products:

{{prodctList}}

and given user requirements:
{{userRequirements}}

Auggest the product from resell products to best fit with users requirement:
- chainName to execute on: Must be one of ["ethereum", "base", ...] (like in viem/chains)

Respond with a proper product info with it's price and image.

Note: Ensure to use the user’s latest instruction to extract data; if it is not within the defined options, use null.

`;
