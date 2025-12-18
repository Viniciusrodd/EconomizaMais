
// create monthly_consumption DTO
export interface CreateMonthlyConsumptionDTO {
   userId: string;
   year: number;
   month: number;
   energy_kwh: number;
   water_m3: number;
   gas_m3: number;
};


// update monthly_consumption DTO
export interface UpdateMonthlyConsumptionDTO {
   energy_kwh?: number;
   water_m3?: number;
   gas_m3?: number;
};


// get monthly_consumption DTO
export interface MonthlyConsumptionResponseDTO {
   id: string;
   year: number;
   month: number;
   energy_kwh: number;
   water_m3: number;
   gas_m3: number;
   created_at: Date;
   updated_at: Date;
};


// get monthly_consumption summary DTO
export interface MonthlyConsumptionSummaryDTO {
   average_consume: number;
   highest_consume_month: number;
   variation_last_month: number;
};