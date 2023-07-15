/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Graduate } from 'src/graduate/schema/graduate.schema';

export type UsersDocument = User & Document;

@Schema()
export class User {

  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: string;

  @Prop({unique: true, required: true})
  dni: string;

  @Prop({required: true})
  name: string;

  @Prop({required: true})
  phone: string;

  @Prop({unique: true, required: true})
  email: string;

  @Prop({required: true})
  profession: string;

  @Prop({unique: true, required: true})
  username: string;

  @Prop({required: true})
  password: string;

  @Prop({required: true})
  role: string;

  @Prop({type:[{type: mongoose.Schema.Types.ObjectId, ref: 'Graduate'}]})
  graduate: Graduate[];
}
export const UserSchema = SchemaFactory.createForClass(User);
