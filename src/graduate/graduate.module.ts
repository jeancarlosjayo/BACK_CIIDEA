import { Module } from '@nestjs/common';
import { GraduateService } from './graduate.service';
import { GraduateController } from './graduate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Graduate, GraduateSchema } from './schema/graduate.schema';
import { Counter, CounterSchema } from './schema/counter.schema';
import { CommonService } from 'src/utils/common.service';
import { User, UserSchema } from 'src/users/schema/users.schema';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Graduate.name,
        schema: GraduateSchema,
      },
      {
        name: Counter.name,
        schema: CounterSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [GraduateController],
  providers: [GraduateService, CommonService, UsersService],
})
export class GraduateModule {}
