
// consume_type
export type Consume_type = 'energy' | 'water' | 'gas';
export type Insight_category = 'tips' | 'patterns' | 'anomalies';

// Create AIInsight DTO
export interface CreateAIInsightDTO {
   consume_type: Consume_type;
   insight_category: Insight_category; 
}

// AI Insight Input DTO
export interface AIInsightInputDTO {
   insight_category: Insight_category; 
   consume_type: Consume_type;
   average_consume: number;
   highest_consume_month: string | null;
   variation_last_month: number;
}

// AI Insight Response DTO
export interface AIInsightResponseDTO {
   id: string;
   input_summary: string;
   ai_response: string;
   insight_category: Insight_category; 
   consume_type: Consume_type;
   created_at: Date;
}