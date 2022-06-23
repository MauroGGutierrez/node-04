import UsersDao from "../daos/users.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import { CreateUserDto } from "../dto/create.user.dto";
import { PutUserDto } from "../dto/put.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";

class UsersService implements CRUD {
  async create(resource: CreateUserDto) {
    return UsersDao.addUser(resource); // string
  }

  async deleteById(id: string) {
    return UsersDao.removeUserById(id); // string
  }

  async list(limit: number, page: number) {
    return UsersDao.getUsers(limit, page); // un array de CreateUserDto[]
  }

  async patchById(id: string, resource: PatchUserDto) {
    return UsersDao.updateUserById(id, resource); // string
  }

  async readById(id: string) {
    return UsersDao.getUserById(id); // CreateUserDto | undefined
  }

  async putById(id: string, resource: PutUserDto) {
    return UsersDao.updateUserById(id, resource); // string
  }

  async getUserByEmail(email: string) {
    return UsersDao.getUserByEmail(email); // devuelver un CreateUserDto | undefined
  }
  async getUserByEmailWithPassword(email: string) {
    return UsersDao.getUserByEmailWithPassword(email);
  }
}

export default new UsersService();
