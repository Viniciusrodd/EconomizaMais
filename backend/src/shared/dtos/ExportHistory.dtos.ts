
// user data
export interface UserDataToExportDTO {
   id?: string;
   name: string;
   residence_name: string;
   number_of_residents: number;
};

// user tariffs
export interface TariffsToExportDTO {
   energy_tariff: number;
   water_tariff: number;
   gas_tariff: number;
};

// user monthly consumptions
export interface MonthConsumptionsToExportDTO {
   year: number;
   month: number;
   energy_kwh: number;
   water_m3: number;
   gas_m3: number;
};


// Export Response DTO
export interface PDFResponseDTO {
   id?: string;
   user_data: UserDataToExportDTO;
   user_tariffs: TariffsToExportDTO;
   user_month_consumptions: MonthConsumptionsToExportDTO[];
   file_path: string;
   created_at?: Date;
};


// PDF generation DTO
export interface PDFGenerationDTO {
   user_data: UserDataToExportDTO;
   user_tariffs: TariffsToExportDTO;
   user_month_consumptions: MonthConsumptionsToExportDTO[];   
};


// Export Histories Response DTO
export interface HistoriesResponseDTO {
   id: string;
   file_path: string;
   created_at: Date;
};


// pdf file data response DTO
export interface FileDataResponseDTO {
   filePath: string;
   fileName: string;
};