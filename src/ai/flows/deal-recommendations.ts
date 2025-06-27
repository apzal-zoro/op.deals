// src/ai/flows/deal-recommendations.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing personalized game deal recommendations.
 *
 * - dealRecommendations - A function that takes user wishlist and gaming preferences as input and returns personalized game deal recommendations.
 * - DealRecommendationsInput - The input type for the dealRecommendations function.
 * - DealRecommendationsOutput - The return type for the dealRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DealRecommendationsInputSchema = z.object({
  wishlist: z.array(
    z.string().describe('List of game titles in the user\'s wishlist.')
  ).describe('The user\'s wishlist of games.'),
  gameLibrary: z.array(
    z.string().describe('List of game titles in the user\'s game library.')
  ).describe('The user\'s game library.'),
  purchaseHistory: z.array(
    z.string().describe('List of game titles in the user\'s purchase history.')
  ).describe('The user\'s purchase history.'),
  discountLevel: z.string().describe('The minimum discount level the user is interested in (e.g., 50% or higher).'),
  preferredStores: z.array(
    z.string().describe('List of store names the user prefers (e.g., Steam, GOG).')
  ).describe('The user\'s preferred stores.'),
});
export type DealRecommendationsInput = z.infer<typeof DealRecommendationsInputSchema>;

const DealRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      gameTitle: z.string().describe('The title of the recommended game.'),
      dealLink: z.string().describe('The link to the deal for the game.'),
      discount: z.string().describe('The discount percentage offered in the deal.'),
      store: z.string().describe('The name of the store offering the deal.'),
      price: z.string().describe('The discounted price of the game in INR.'),
    }).describe('A single game deal recommendation.')
  ).describe('A list of personalized game deal recommendations.'),
});
export type DealRecommendationsOutput = z.infer<typeof DealRecommendationsOutputSchema>;

export async function dealRecommendations(input: DealRecommendationsInput): Promise<DealRecommendationsOutput> {
  return dealRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dealRecommendationsPrompt',
  input: {schema: DealRecommendationsInputSchema},
  output: {schema: DealRecommendationsOutputSchema},
  prompt: `You are a personal game deal recommendation expert.

  Based on the user's wishlist, game library, purchase history, desired discount level, and preferred stores, provide a list of personalized game deal recommendations.

  Wishlist: {{wishlist}}
  Game Library: {{gameLibrary}}
  Purchase History: {{purchaseHistory}}
  Discount Level: {{discountLevel}}
  Preferred Stores: {{preferredStores}}

  Provide the recommendations in a JSON format.
  Each recommendation should include the game title, deal link, discount, store, and price in INR.
  Ensure that the discount is at least at the level specified by the user.
  Prioritize deals from the user's preferred stores.
  Do not suggest games already present in the user's game library.
  Do not suggest games the user has already purchased.
  Limit the recommendations to 5.

  Output format: 
  {
    "recommendations": [
      {
        "gameTitle": "string",
        "dealLink": "string",
        "discount": "string",
        "store": "string",
        "price": "string"
      }
    ]
  }
  `,
});

const dealRecommendationsFlow = ai.defineFlow(
  {
    name: 'dealRecommendationsFlow',
    inputSchema: DealRecommendationsInputSchema,
    outputSchema: DealRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

