import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Attendance, AttendancesDocument } from './schema/attendance.schema';
import { Model } from 'mongoose';

@Injectable()
export class AttendanceService {
constructor(@InjectModel(Attendance.name) private attendanceModule: Model<AttendancesDocument>){}
 async create(createAttendanceDto: CreateAttendanceDto) {
    const createAttendance = await this.attendanceModule.create(createAttendanceDto)
    return createAttendance;
  }

 async findAll() {
    const findAllAttendance = await this.attendanceModule.find();
    return findAllAttendance;
  }

  async findOne(id: string) {
    const findOneAttendance = await this.attendanceModule.findById(id)
    return findOneAttendance;
  }

  async porcentAttendance(graduateId: string){
  const listGraduate = await this.attendanceModule.find({graduate: graduateId})
    return listGraduate;
  }

  async update(id: string, updateAttendanceDto: UpdateAttendanceDto) {
    const updateAttendance = await this.attendanceModule.findByIdAndUpdate(id, updateAttendanceDto)
    return updateAttendance;
  }

  async remove(id: string) {
    const deleteAttendance = await this.attendanceModule.deleteOne({_id:id})
    return deleteAttendance;
  }
}
