/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Graduate } from 'src/graduate/schema/graduate.schema';
import { User } from 'src/users/schema/users.schema';

export type AttendancesDocument = Attendance & Document;

@Schema()
export class Attendance {

    @Prop({type:[{type: mongoose.Schema.Types.ObjectId, ref:'User'}]})
    listStudents: User[]

    @Prop({type: mongoose.Schema.Types.ObjectId, ref:'Graduate'})
    graduate: Graduate

    @Prop()
    fechaAsistencia: string

}
export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
