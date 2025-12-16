
// create user DTO
export interface CreateUserDTO {
   name: string;
   residenceName: string;
   numberOfResidents: number;
};

// update user DTO
export interface UpdateUserDTO {
   name?: string;
   residenceName?: string;
   numberOfResidents?: number;
};

// user response DTO
export interface UserResponseDTO {
   id: string;
   name: string;
   residenceName: string;
   numberOfResidents: number;
   createdAt: Date;
   updatedAt: Date;
};