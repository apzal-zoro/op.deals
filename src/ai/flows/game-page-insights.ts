// src/ai/flows/game-page-insights.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing AI-powered insights on a game's deal page.
 *
 * - gamePageInsights - A function that provides contextual advice about a game deal.
 * - GamePageInsightsInput - The input type for the gamePageInsights function.
 * - GamePageInsightsOutput - The return type for the gamePageInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GamePageInsightsInputSchema = z.object({
  gameTitle: z.string().describe("The title of the game being viewed."),
  currentPriceINR: z.number().describe("The current price of the game in INR."),
  isHistoricLow: z.boolean().describe("Whether the current price is a historic low."),
  gameLibrary: z.array(z.string()).describe("A list of games the user already owns."),
  wishlist: z.array(z.string()).describe("A list of games on the user's wishlist."),
  description: z.string().describe("The game's description."),
});
export type GamePageInsightsInput = z.infer<typeof GamePageInsightsInputSchema>;

const GamePageInsightsOutputSchema = z.object({
  insightMessage: z.string().describe('A helpful and concise insight for the user about this game deal.'),
});
export type GamePageInsightsOutput = z.infer<typeof GamePageInsightsOutputSchema>;

export async function gamePageInsights(input: GamePageInsightsInput): Promise<GamePageInsightsOutput> {
  return gamePageInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'gamePageInsightsPrompt',
  input: {schema: GamePageInsightsInputSchema},
  output: {schema: GamePageInsightsOutputSchema},
  prompt: `You are a helpful and savvy personal game shopping assistant. Your goal is to give the user a concise, actionable insight about the game they are looking at.

Here is the information you have:
- Game Title: {{{gameTitle}}}
- Current Price (INR): {{{currentPriceINR}}}
- Is this the historic low price?: {{#if isHistoricLow}}Yes{{else}}No{{/if}}
- Game Description: {{{description}}}
- User's Game Library: {{#if gameLibrary}}{{#each gameLibrary}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}empty{{/if}}
- User's Wishlist: {{#if wishlist}}{{#each wishlist}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}empty{{/if}}

Analyze this information and provide a single, helpful 'insightMessage'.

- **CRITICAL:** If the game is already in the user's library, your primary message MUST be to inform them they already own it.
- If the game is on their wishlist, acknowledge that this is a good opportunity.
- If the price is not a historic low, mention that a better deal might come along, but consider if the current price is still good value based on the game.
- If it IS a historic low, emphasize that this is a great time to buy.
- Keep the message friendly, concise, and to the point (2-3 sentences max).
`,
});

const gamePageInsightsFlow = ai.defineFlow(
  {
    name: 'gamePageInsightsFlow',
    inputSchema: GamePageInsightsInputSchema,
    outputSchema: GamePageInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
