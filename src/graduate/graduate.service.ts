import { Injectable } from '@nestjs/common';
import { CreateGraduateDto } from './dto/create-graduate.dto';
import { UpdateGraduateDto } from './dto/update-graduate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Graduate, GraduatesDocument } from './schema/graduate.schema';
import { Model } from 'mongoose';
import { Counter } from './schema/counter.schema';

@Injectable()
export class GraduateService {
  constructor(
    @InjectModel(Graduate.name)
    private graduateModule: Model<GraduatesDocument>,
    @InjectModel('Counter') private readonly counterModel: Model<Counter>,
  ) {}

  async create(createGraduateDto: CreateGraduateDto) {
    const createGraduate = await this.graduateModule.create(createGraduateDto);
    return createGraduate;
  }

  async findAll() {
    const listGraduate = (await this.graduateModule.find({})).reverse();
    return listGraduate;
  }

  async findOne(id: string) {
    const graduate = await this.graduateModule.findById(id);
    return graduate;
  }
  async update(id: string, updateGraduateDto: UpdateGraduateDto) {
    const updateGraduate = await this.graduateModule.findByIdAndUpdate(
      id,
      updateGraduateDto,
    );
    return updateGraduate;
  }

  async remove(id: string) {
    const deleteGraduate = await this.graduateModule.deleteOne({ _id: id });
    return deleteGraduate;
  }

  async getNextSequence(name: string): Promise<number> {
    const counter = await this.counterModel.findOneAndUpdate(
      { name },
      { $inc: { value: 1 } },
      { new: true, upsert: true },
    );
    return counter.value;
  }
}
