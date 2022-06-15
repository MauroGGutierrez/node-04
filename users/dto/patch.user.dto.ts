import { PutUserDto } from "./put.user.dto";

export interface PatchUserDto extends Partial<PutUserDto> {} //el partial me cambia lo que era obligatorio a algo que no es obligatorio
