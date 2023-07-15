import {  HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from 'src/users/schema/users.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UsersDocument>,
    private jwtAuthService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { username, password } = loginAuthDto;
    const findUser = await this.userModel.findOne({ username });
    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404);
    const checkPassword = await compare(password, findUser.password);
    if (!checkPassword)
      throw new HttpException('PASSWORD_INVALID', HttpStatus.FORBIDDEN);
    const payload = { id: findUser._id, username: findUser.username, role: findUser.role };
    const token = this.jwtAuthService.sign(payload);
    const data = {
      success: true,
      id: findUser._id,
      token,
    };
    return data;
  }

 
  async verifyToken(@Res() res, token:string){
      try {
        if(!token) return res.json([{status: false}]);
        const verified = await this.jwtAuthService.verify(token);
        const user = await this.userModel.findById(verified.id);
        if (!user) return res.json([{status: false}]);
        return res.json([{status: true}]);
      } catch (error) {
        return res.json([{status: false}])
      }
  }
}
