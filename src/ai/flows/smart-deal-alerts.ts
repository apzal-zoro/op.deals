// 'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating smart deal alerts
 * based on user preferences, incorporating discount level and store reputation.
 *
 * - smartDealAlerts - A function that generates smart deal alerts for users.
 * - SmartDealAlertsInput - The input type for the smartDealAlerts function.
 * - SmartDealAlertsOutput - The return type for the smartDealAlerts function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartDealAlertsInputSchema = z.object({
  gameTitle: z.string().describe('The title of the game the user is interested in.'),
  userWishlist: z.array(z.string()).describe('A list of game titles in the user\u2019s wishlist.'),
  gameLibrary: z.array(z.string()).describe('A list of game titles in the user\u2019s game library.'),
  purchaseHistory: z.array(z.string()).describe('A list of game titles the user has previously purchased.'),
  discountPercentage: z.number().describe('The discount percentage for the game.'),
  storeName: z.string().describe('The name of the store offering the deal.'),
  storeReputation: z.string().describe('The reputation of the store offering the deal (e.g., trusted, keyshop, unknown).'),
});

export type SmartDealAlertsInput = z.infer<typeof SmartDealAlertsInputSchema>;

const SmartDealAlertsOutputSchema = z.object({
  alertMessage: z.string().describe('A smart alert message for the user, incorporating the discount level and store reputation.'),
});

export type SmartDealAlertsOutput = z.infer<typeof SmartDealAlertsOutputSchema>;

export async function smartDealAlerts(input: SmartDealAlertsInput): Promise<SmartDealAlertsOutput> {
  return smartDealAlertsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartDealAlertsPrompt',
  input: {schema: SmartDealAlertsInputSchema},
  output: {schema: SmartDealAlertsOutputSchema},
  prompt: `You are a personal shopping assistant that alerts users to deals on games they are interested in.

You will take into account the user's wishlist, game library, purchase history, the discount percentage, the store name, and the store's reputation when crafting the alert message.

Here is the information you have:

Game Title: {{{gameTitle}}}
User Wishlist: {{#each userWishlist}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Game Library: {{#each gameLibrary}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Purchase History: {{#each purchaseHistory}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Discount Percentage: {{{discountPercentage}}}%
Store Name: {{{storeName}}}
Store Reputation: {{{storeReputation}}}

Craft a concise and informative alert message for the user, highlighting the key details of the deal and any relevant warnings based on the store's reputation.
`,
});

const smartDealAlertsFlow = ai.defineFlow(
  {
    name: 'smartDealAlertsFlow',
    inputSchema: SmartDealAlertsInputSchema,
    outputSchema: SmartDealAlertsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
