/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Graduate } from 'src/graduate/schema/graduate.schema';
import { Quote } from 'src/quotes/schema/quote.schema';
import { User } from 'src/users/schema/users.schema';

export type PaymentsDocument = Payment & Document;

@Schema()
export class Payment {
    @Prop()
    importeTotal: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref:'User'})
    student: User

    @Prop({type: mongoose.Schema.Types.ObjectId, ref:'Graduate'})
    graduate: Graduate

    @Prop({type:[{type: mongoose.Schema.Types.ObjectId, ref: 'Quote'}]})
    quote: Quote[]

}
export const PaymentSchema = SchemaFactory.createForClass(Payment);
