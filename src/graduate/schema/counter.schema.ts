/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CountersDocument = Counter & Document;

@Schema()
export class Counter {
  @Prop()
  name: string;

  @Prop()
  value: number;
}
export const CounterSchema = SchemaFactory.createForClass(Counter);
