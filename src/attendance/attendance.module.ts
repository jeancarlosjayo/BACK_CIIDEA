import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendance, AttendanceSchema } from './schema/attendance.schema';
import { User, UserSchema } from 'src/users/schema/users.schema';
import { Graduate, GraduateSchema } from 'src/graduate/schema/graduate.schema';
import { UsersService } from 'src/users/users.service';
import { Payment, PaymentSchema } from 'src/payments/schema/payments.schema';
import { PaymentsService } from 'src/payments/payments.service';
import { GraduateService } from 'src/graduate/graduate.service';
import { CommonService } from 'src/utils/common.service';
import { Counter, CounterSchema } from 'src/graduate/schema/counter.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Attendance.name,
        schema: AttendanceSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Graduate.name,
        schema: GraduateSchema,
      },
      {
        name: Counter.name,
        schema: CounterSchema,
      },
      {
        name: Payment.name,
        schema: PaymentSchema,
      }
    ]),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService,UsersService,PaymentsService,CommonService, GraduateService]
})
export class AttendanceModule {}
