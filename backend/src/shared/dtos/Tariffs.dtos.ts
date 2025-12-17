
// create tariff DTO
export interface CreateTariffDTO {
   energy_tariff: number;
   water_tariff: number;
   gas_tariff: number;
};


// get tariff DTO
export interface TariffResponseDTO {
   id: string;
   energy_tariff: number;
   water_tariff: number;
   gas_tariff: number;
   created_at: Date;
   updated_at: Date;
};


// update tariff DTO
export interface UpdateTariffDTO {
   energy_tariff?: number;
   water_tariff?: number;
   gas_tariff?: number;
};