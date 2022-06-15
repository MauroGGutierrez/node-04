export interface CreateUserDto {
  id: string;
  email: string;
  password: string;
  firstName?: string; // el signo ? me quiere decir que no es obligatorio
  lastName?: string;
  permissionLevel?: number;
}
