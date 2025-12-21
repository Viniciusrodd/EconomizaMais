
// user data
export interface UserDataToExportDTO {
   user_name: string;
   residence_name: string;
   number_of_residents: number;
};

// user tariffs
export interface TariffsToExportDTO {
   energy_tariff: string;
   water_tariff: string;
   gas_tariff: number;
};

// user monthly consumptions
export interface MonthConsumptionsToExportDTO {
   year: number;
   month: number;
   energy_kwh: string;
   water_m3: string;
   gas_m3: string;
};


// Export Response DTO
export interface PDFResponseDTO {
   id: string;
   user_data: UserDataToExportDTO;
   user_tariffs: TariffsToExportDTO;
   user_month_consumptions: MonthConsumptionsToExportDTO;
   file_path: string;
   created_at: Date;
};


// Export Histories Response DTO
export interface HistoriesResponseDTO {
   id: string;
   file_path: string;
   created_at: Date;
};