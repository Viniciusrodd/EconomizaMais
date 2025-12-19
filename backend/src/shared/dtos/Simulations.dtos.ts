
// create simulation DTO
export interface CreateSimulationDTO {
   target_type: 'energy' | 'water' | 'gas' | 'all';
   reduction_percent: number; // 0 < x <= 100
};

// simulation response DTO
export interface SimulationResponseDTO {
   id: string;
   target_type: 'energy' | 'water' | 'gas' | 'all';
   reduction_percent: number;
   monthly_saving: number;
   annual_saving: number;
   environmental_impact: string;
   created_at: Date;
};