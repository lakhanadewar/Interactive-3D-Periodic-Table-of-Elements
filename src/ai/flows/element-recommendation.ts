'use server';

/**
 * @fileOverview Provides AI-powered recommendations for related elements based on the currently viewed element's properties and chemical relationships.
 *
 * - elementRecommendation - A function that handles the element recommendation process.
 * - ElementRecommendationInput - The input type for the elementRecommendation function.
 * - ElementRecommendationOutput - The return type for the elementRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ElementRecommendationInputSchema = z.object({
  elementName: z.string().describe('The name of the element to find recommendations for.'),
  elementSummary: z.string().describe('The summary of the element to find recommendations for.'),
  elementProperties: z.string().describe('The key properties of the element to find recommendations for, such as atomic mass, density, etc.'),
});
export type ElementRecommendationInput = z.infer<typeof ElementRecommendationInputSchema>;

const ElementRecommendationOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of recommended elements based on the input element.'),
  reasoning: z.string().describe('The reasoning behind the recommendations.'),
});
export type ElementRecommendationOutput = z.infer<typeof ElementRecommendationOutputSchema>;

export async function elementRecommendation(input: ElementRecommendationInput): Promise<ElementRecommendationOutput> {
  return elementRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'elementRecommendationPrompt',
  input: {schema: ElementRecommendationInputSchema},
  output: {schema: ElementRecommendationOutputSchema},
  prompt: `You are an expert chemistry assistant. Given the properties, summary, and name of an element, you will recommend other elements with similar properties or chemical relationships.

Element Name: {{elementName}}
Element Summary: {{elementSummary}}
Element Properties: {{elementProperties}}

Based on this information, recommend three elements that are chemically similar or have similar properties. Explain your reasoning for each recommendation.

Ensure that your response is formatted as a JSON object with "recommendations" as an array of strings and "reasoning" as a string.\n`,
});

const elementRecommendationFlow = ai.defineFlow(
  {
    name: 'elementRecommendationFlow',
    inputSchema: ElementRecommendationInputSchema,
    outputSchema: ElementRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
