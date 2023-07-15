import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Response } from 'express';
import { User, UsersDocument } from 'src/users/schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentsService } from 'src/payments/payments.service';
import { GraduateService } from 'src/graduate/graduate.service';
import { Graduate, GraduatesDocument } from 'src/graduate/schema/graduate.schema';
@Controller('attendance')
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService,
    private readonly paymentsService: PaymentsService,
    @InjectModel(Graduate.name) private graduateModule: Model<GraduatesDocument>,
    @InjectModel(User.name) private usersModule: Model<UsersDocument>,
  ) {}

  @Post()
  async create(
    @Res() res: Response,
    @Body() createAttendanceDto: CreateAttendanceDto,
  ) {
    const createAttendance = await this.attendanceService.create(
      createAttendanceDto,
    );
    res
      .status(HttpStatus.CREATED)
      .send({ message: 'Asistencia generada exitosamente.' });
    return createAttendance;
  }

  @Get()
  async findAll() {
    return await this.attendanceService.findAll();
  }

  @Get('report/:graduate')
  async findAttendance(@Param('graduate') graduate: string) {
    const findAllUsersForGraduate = (await this.usersModule.find()).filter(
      (user) =>
        user.role === 'student' &&
        user.graduate.find(
          (g) => JSON.stringify(g._id) === JSON.stringify(graduate),
        ),
    );
    const findGraduateStudens = await this.attendanceService.porcentAttendance(
      graduate,
    );
    const allStudentsList = findAllUsersForGraduate.map((u) =>
      JSON.stringify(u._id),
    );
    const studentsAttendance = findGraduateStudens.map((s) => s.listStudents);
    let count = {};
    studentsAttendance.forEach((innerArray) => {
      innerArray.forEach((element) => {
        const elemento = JSON.stringify(element);
        if (allStudentsList.includes(elemento)) {
          count[elemento] = count[elemento] ? count[elemento] + 1 : 1;
        }
      });
    });
    const countWithSubstring = {};
    for (const key in count) {
      if (count.hasOwnProperty(key)) {
        const substring = key.substring(1, 25);
        countWithSubstring[substring] = count[key];
      }
    }
    const separatedObjects = [];
    for (const [key, value] of Object.entries(countWithSubstring)) {      
     const studenValue = await this.usersModule.findOne({_id:key})
     const payments =  await this.paymentsService.findPaymentByStudent(key,graduate)
     const sessions = await this.graduateModule.findById(graduate)
     const resultAttendance = (Number(value)/sessions.sessions)*100
      const separatedObj = {
        student: studenValue,
        attendance: resultAttendance.toFixed(0)+"%",
        cuotes: payments,
        numCuotes:payments.length
      };
      separatedObjects.push(separatedObj);
    }
    return separatedObjects;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.attendanceService.findOne(id);
  }

  @Put(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    const updateAttendance = await this.attendanceService.update(
      id,
      updateAttendanceDto,
    );
    res
      .status(HttpStatus.CREATED)
      .send({ message: 'Asistencia actualizada exitosamente.' });
    return updateAttendance;
  }

  @Delete(':id')
  remove(@Res() res: Response, @Param('id') id: string) {
    const deleteAttendance = this.attendanceService.remove(id);
    res.status(HttpStatus.OK).send({ message: 'Asistencia eliminada.' });
    return deleteAttendance;
  }
}
