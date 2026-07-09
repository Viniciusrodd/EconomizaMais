
// create user DTO
export interface CreateUserDTO {
   name: string;
   residence_name: string;
   number_of_residents: number;
}

// update user DTO
export interface UpdateUserDTO {
   name?: string;
   residence_name?: string;
   number_of_residents?: number;
}

// user response DTO
export interface UserResponseDTO {
   id: string;
   name: string;
   residence_name: string;
   number_of_residents: number;
   created_at: Date;
   updated_at: Date;
}