/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type QuotesDocument = Quote & Document;

@Schema()
export class Quote {
  @Prop()
  codOperacion: string;

  @Prop()
  numCuota: number;

  @Prop()
  metodoPago:string;

  @Prop()
  fecVencCuota: string;

  @Prop()
  fecPagoCuota: string;

  @Prop()
  importeCuota: number;

  @Prop()
  status: string;

  @Prop({type:Object})
  voucher: string;
}
export const QuoteSchema = SchemaFactory.createForClass(Quote);
