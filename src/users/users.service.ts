import {  Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from './schema/users.schema';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModule: Model<UsersDocument>,
  ) {}
  //TODO: CREATE USER
  async create(userObject: CreateUserDto) {
    const { password } = userObject;
    const plainToHash = await hash(password, 10);
    userObject = { ...userObject, password: plainToHash };
    const userCreatedResponse = await this.usersModule.create(userObject);
    return userCreatedResponse;
  }
  //TODO: LIST USERS
  async findAll() {
    const findAllUser = (await this.usersModule.find().populate('graduate').exec()).reverse();
    return findAllUser;
  }
  //TODO: LIST ONE USER
  async findOne(id: string) {
    const findOneUser = await this.usersModule
      .findById(id)
      .populate('graduate')
      .exec();
    return findOneUser;
  }
  async findGraduate(id: string) {
    const findOneUser = await this.usersModule.findById(id)
    return findOneUser;
  }
  //TODO: LIST USERS X GRADUATE CODE AND ROLETYPE
  async findAllUsersForGraduate(code: string, roleType: string) {
    const findAllUsersForGraduate = (
      await this.usersModule.find().populate('graduate').exec()
    ).filter(
      (user) =>
        user.role === roleType && user.graduate.find((g) => g.code === code),
    );
    return findAllUsersForGraduate;
  }
    //TODO: LIST STUDENTS X GRADUATE
    async findAllStudentsForGraduate(id: string) {
      const findAllUsersForGraduate = (
        await this.usersModule.find()
      ).filter(
        (user) =>
          user.role === 'student' && user.graduate.find((g) => JSON.stringify(g._id)===JSON.stringify(id))
      );
      return findAllUsersForGraduate;
    }
  //TODO: LIST USERS X GRADUATE CODE
  async findUsersByGraduates(code: string) {
    const findUserByGraduate = (
      await this.usersModule.find().populate('graduate').exec()
    ).filter((user) => user.graduate.find((g) => g.code === code));
    return findUserByGraduate;
  }
  //TODO: UPDATE USER
  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateUser = await this.usersModule.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    return updateUser;
  }
  //TODO: DELETE USER
  async remove(id: string) {
    const deleteUser = await this.usersModule.deleteOne({ _id: id });
    return deleteUser;
  }
}
