
// User
export interface User {
   id?: string; // UUID
   name: string;
   residence_name: string;
   number_of_residents: number;
   created_at?: Date;
   updated_at?: Date;
};


// Tariff
export interface Tariff {
   id?: string; // UUID
   user_id: string;
   energy_tariff: number;
   water_tariff: number;
   gas_tariff: number;
   created_at?: Date;
   updated_at?: Date;
};


// Monthly Consumption
export interface MonthlyConsumption {
   id?: string; // UUID
   user_id: string;
   year: number;   // ex: 2025
   month: number;  // 1–12
   energy_kwh: number;
   water_m3: number;
   gas_m3: number;
   created_at?: Date;
   updated_at?: Date;
};


// Simulation
export type SimulationTargetType =
   | 'energy'
   | 'water'
   | 'gas'
   | 'all';

export interface Simulation {
   id?: string; // UUID
   user_id: string;
   reduction_percent: number;
   target_type: SimulationTargetType;
   monthly_saving: number;
   annual_saving: number;
   environmental_impact: number;
   feedback: string;
   created_at?: Date;
};


// AI Insight
export type AIInsightCategory =
   | 'tips'
   | 'patterns'
   | 'anomalies';

export type AIInsightConsumeType =
   | 'energy'
   | 'water'
   | 'gas'
export interface AIInsight {
   id?: string; // UUID
   user_id: string;
   input_summary: string;
   ai_response: string;
   insight_category: AIInsightCategory;
   consume_type: AIInsightConsumeType;
   created_at?: Date;
   updated_at?: Date;
};


// Export History
export interface ExportHistory {
   id: string; // UUID
   user_id: string;
   file_path: string;
   exported_at?: Date;
};