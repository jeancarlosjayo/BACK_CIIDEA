import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Res
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  loginUser(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
  @Get('verify')
  verifyUser(@Request() req, @Res() res) {
    const token = req.header('Authorization');
    return this.authService.verifyToken(res, token);
  }
}
