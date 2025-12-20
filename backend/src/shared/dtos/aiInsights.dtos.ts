
// Create AIInsight DTO
export interface CreateAIInsightDTO {
   consume_type: 'energy' | 'water' | 'gas';
   insight_category: 'tips' | 'patterns' | 'anomalies'; 
};

// AI Insight Input DTO
export interface AIInsightInputDTO {
   insight_category: 'tips' | 'patterns' | 'anomalies'; 
   consume_type: 'energy' | 'water' | 'gas';
   average_consume: number;
   highest_consume_month: string;
   variation_last_month: number;
};

// AI Insight Response DTO
export interface AIInsightResponseDTO {
   id: string;
   insight_category: 'tips' | 'patterns' | 'anomalies'; 
   consume_type: 'energy' | 'water' | 'gas';
   message: string;
   created_at: Date;
};