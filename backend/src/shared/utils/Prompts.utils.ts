
// import DTOs
import { CreateSimulationDTO } from "@DTOs/Simulations.dtos";
import { AIInsightInputDTO } from "@DTOs/aiInsights.dtos";


// class - prompt utils
export class Prompts {

   // Simulations - environmental Impact Prompt 
   public environmentalImpactPrompt(
      data: CreateSimulationDTO
   ): string {
      const { target_type, reduction_percent } = data;

      return `
         Explain in simple Portuguese how reducing 
         ${reduction_percent}% of ${target_type} 
         consumption helps reduce environmental impact.

         Keep it short and educational.
      `.trim();
   };


   // AI insights - ai_response Prompt
   public aiResponsePrompt(
      data: AIInsightInputDTO
   ): string {
      const { 
         insight_category, consume_type, 
         average_consume, highest_consume_month, 
         variation_last_month 
      } = data;

      return [
         'You are an assistant that analyzes household consumption.',
         '',
         'Data:',
         `- Consumption type: ${consume_type}`,
         `- Average monthly consumption: ${average_consume}`,
         `- Month of highest consumption: ${highest_consume_month}`,
         `- Variation compared to previous month: +${variation_last_month}%`,
         '',
         'Task:',
         `- Identify the pattern: ${insight_category}.`,
         '- Explain in simple terms, without technical language.',
         '- Return the response in a structured format:',
         '  • First line: a brief summary sentence.',
         '  • Blank line.',
         '  • Then 2 to 4 short lines with practical guidance.',
         `- Classify as: ${insight_category}.`,
         '',
         'Formatting rules:',
         '- Use line breaks to separate ideas.',
         '- Do NOT use markdown symbols (*, #, **).',
         '- Do NOT use emojis.',
         '- Keep the text simple and accessible.',
         '',
         'Response language: PORTUGUESE'
      ].join('\n');
   };

};