import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentsDocument } from './schema/payments.schema';
import { Model } from 'mongoose';
@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentsModule: Model<PaymentsDocument>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const createPayment = await this.paymentsModule.create(createPaymentDto);
    return createPayment;
  }
  async findAll() {
    const findAllPayments = (
      await this.paymentsModule
        .find()
        .populate('student')
        .populate('graduate')
        .populate('quote')
    ).reverse();
    return findAllPayments;
  }
  async findPaymentByStudent(student: string, graduate: string) {
    const findPayByStudent = (
      await this.paymentsModule.find().populate('quote')
    ).filter((f) => JSON.stringify(f.student) === JSON.stringify(student) && JSON.stringify(f.graduate) === JSON.stringify(graduate));
    for(let i=0; i<findPayByStudent.length; i++) {
    let resultado = findPayByStudent[i].quote
    return resultado;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    const updatePayment = await this.paymentsModule.findByIdAndUpdate(id, updatePaymentDto,{new: true})
    return updatePayment;
  }

  async remove(id: string) {
    const deletePayment = await this.paymentsModule.deleteOne({ _id: id });
    return deletePayment;
  }
}
