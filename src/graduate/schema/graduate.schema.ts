/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
export type GraduatesDocument = Graduate & Document;

@Schema()
export class Graduate{
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: string;

  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop()
  startDate: string;

  @Prop()
  endDate: string;

  @Prop()
  status: string;

  @Prop()
  cost: number;
  
  @Prop()
  sessions: number;
}
export const GraduateSchema = SchemaFactory.createForClass(Graduate);
