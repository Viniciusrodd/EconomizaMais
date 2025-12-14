
// User
export interface User {
   id: string; // UUID
   name: string;
   residenceName: string;
   numberOfResidents: number;
   createdAt: Date;
   updatedAt: Date;
};


// Tariff
export interface Tariff {
   id: string; // UUID
   user_id: string;
   energyTariff: number;
   waterTariff: number;
   gasTariff: number;
   createdAt: Date;
   updatedAt: Date;
};


// Monthly Consumption
export interface MonthlyConsumption {
   id: string; // UUID
   user_id: string;
   year: number;   // ex: 2025
   month: number;  // 1–12
   energyKwh: number;
   waterM3: number;
   gasM3: number;
   createdAt: Date;
   updatedAt: Date;
};


// Simulation
export type SimulationTargetType =
   | 'energy'
   | 'water'
   | 'gas'
   | 'all';

export interface Simulation {
   id: string; // UUID
   user_id: string;
   reductionPercent: number;
   targetType: SimulationTargetType;
   calculatedSaving: number;
   calculatedEnvironmentalImpact: string;
   createdAt: Date;
};


// AI Insight
export type AIInsightCategory =
   | 'dicas'
   | 'padroes'
   | 'anomalias';

export interface AIInsight {
   id: string; // UUID
   user_id: string;
   inputSummary: string;
   aiResponse: string;
   insightCategory: AIInsightCategory;
   createdAt: Date;
};


// Export History
export interface ExportHistory {
   id: string; // UUID
   user_id: string;
   filePath: string;
   exportedAt: Date;
};