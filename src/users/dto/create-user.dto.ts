import { IsEmpty, IsNotEmpty } from 'class-validator';
import { Graduate } from 'src/graduate/schema/graduate.schema';

export class CreateUserDto {
  @IsNotEmpty()
  dni: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  profession: string;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  role: string;
  @IsEmpty()
  graduate: Graduate;
}


