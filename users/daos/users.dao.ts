import shortid from "shortid";
import debug from "debug";

import mongooseService from "../../common/services/mongoose.service";
import { CreateUserDto } from "../dto/create.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";
import { PutUserDto } from "../dto/put.user.dto";

const log: debug.IDebugger = debug("app:in-memory-dao");

class UsersDao {
  users: CreateUserDto[] = [];

  Schema = mongooseService.getMongoose().Schema;

  userSchema = new this.Schema(
    {
      _id: String,
      email: String,
      password: { type: String, select: false },
      firstName: String,
      lastName: String,
      permissionFlags: Number,
    },
    { id: false } // con esto me esta diciendo que no tome ningun id que no sea el que genera mongoose con el _id
  );

  User = mongooseService.getMongoose().model("Users", this.userSchema); // User es un modelo de usuario

  constructor() {
    log("Created new instance of UsersDao");
  }

  async addUser(userFields: CreateUserDto) {
    const userId = shortid.generate();
    const user = new this.User({
      _id: userId,
      ...userFields,
      permissionFlags: 1,
    });
    await user.save();
    return userId;
  }

  async getUserByEmail(email: string) {
    return this.User.findOne({ email: email }).exec();
  }

  async getUserById(userId: string) {
    return this.User.findOne({ _id: userId }).exec(); //populate me quiere decir llena o llenalo
  }

  async getUsers(limit = 25, page = 0) {
    return this.User.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async updateUserById(userId: string, userFields: PatchUserDto | PutUserDto) {
    const existingUser = await this.User.findOneAndUpdate(
      { _id: userId }, // filtro
      { $set: userFields }, // una vez q encuentra al usuario , te tiene q mandar todos sus datos // valores
      { new: true } // esto me dice que si busca un usuario y no lo encuentre , con esto me lo crea // crear
    ).exec(); // exec me indiga donde ocurrio l error

    return existingUser;
  }

  async removeUserById(userId: string) {
    return this.User.deleteOne({ _id: userId }).exec();
  }
}

export default new UsersDao();
