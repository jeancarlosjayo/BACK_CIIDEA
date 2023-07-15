import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from './schema/users.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { Payment, PaymentsDocument } from 'src/payments/schema/payments.schema';
import { Graduate, GraduatesDocument } from 'src/graduate/schema/graduate.schema';

@Controller('users')
export class UsersController {
  constructor(
    @InjectModel(User.name) private usersModule: Model<UsersDocument>,
    @InjectModel(Payment.name) private paymentsModule: Model<PaymentsDocument>,
    @InjectModel(Graduate.name) private graduatesModule: Model<GraduatesDocument>,
    private readonly usersService: UsersService,
  ) {}

  //TODO:CREATE USER
  @Post()
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    try {
      const { dni, email, username } = createUserDto;
      if (
        !createUserDto.dni ||
        !createUserDto.name ||
        !createUserDto.phone ||
        !createUserDto.email ||
        !createUserDto.profession ||
        !createUserDto.username ||
        !createUserDto.password ||
        !createUserDto.role
      ) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'Campos requeridos.' });
        return;
      }
      const existingUser = await this.usersModule
        .findOne()
        .or([{ dni }, { email }, { username }]);
        if(existingUser){
          if (existingUser.dni === dni) {
            res
              .status(HttpStatus.BAD_REQUEST)
              .send({ message: 'El DNI ya existe.' });
            return;
          }
          if (existingUser.email === email) {
            res
              .status(HttpStatus.BAD_REQUEST)
              .send({ message: 'El correo ya existe.' });
            return;
          }
          if (existingUser.username === username) {
            res
              .status(HttpStatus.BAD_REQUEST)
              .send({ message: 'El nombre de usuario ya existe.' });
            return;
          }
        }
          const createUser = this.usersService.create(createUserDto);
          if((await createUser).role==='student'){
            for(let i=0; i<(await createUser).graduate.length; i++){
             const objeto = new ObjectId(createUserDto.graduate[i])
             const findGraduate = await this.graduatesModule.findOne(objeto);
              this.paymentsModule.create({importeTotal:findGraduate.cost,student: (await createUser)._id,graduate:(await createUser).graduate[i]})
            }
          }
          res
            .status(HttpStatus.CREATED)
            .send({ message: 'Usuario creado exitosamente.' });
          return createUser;
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Error interno del servidor.' });
    }
  }
  //TODO:LIST USER
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  //TODO:LIST ONE USER
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @Get('graduate/:data')
  async findAllUsersForGraduate(
    @Query('code') code: string,
    @Query('roleType') roleType: string,
  ) {
    const graduateUserList = await this.usersService.findAllUsersForGraduate(
      code,
      roleType,
    );
    return graduateUserList;
  }
  //TODO:LIST STUDENTS X GRADUATE ID
  @Get('graduate/student/:id')
  async findAllStudentsForGraduate(@Param('id') id: string) {
    const graduateUserList = await this.usersService.findAllStudentsForGraduate(id)
    return graduateUserList;
  }
  //TODO:UPDATE USER
  @Put(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const findGraduate = await this.usersService.findGraduate(id)
      const updateUser = await this.usersService.update(id, updateUserDto);
      if(updateUser.role==='student'){
        for(let i=0 ; i < updateUser.graduate.length; i++) {
          //console.log(i)
          if(!findGraduate.graduate.includes(updateUser.graduate[i])){
            const objeto = new ObjectId(updateUserDto.graduate[i])
            const findGraduate = await this.graduatesModule.findOne(objeto);
            this.paymentsModule.create({importeTotal:findGraduate.cost,student: updateUser._id,graduate:updateUser.graduate[i]})
          }
        }
      }
      res
      .status(HttpStatus.OK)
      .send({ message: 'Usuario actualizado exitosamente.' });
    return updateUser;
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Error interno del servidor.', error });
    }
  }
  //TODO:DELETE USER
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
