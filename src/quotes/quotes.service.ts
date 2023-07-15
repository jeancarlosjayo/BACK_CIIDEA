import { Injectable } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Quote, QuotesDocument } from './schema/quote.schema';
import { Model } from 'mongoose';

@Injectable()
export class QuotesService {
constructor(@InjectModel(Quote.name) private quotesModule:Model<QuotesDocument>,){}

 async create(createQuoteDto: CreateQuoteDto) {
    const quoteCreated = await this.quotesModule.create(createQuoteDto)
    return quoteCreated;
  }

 async findAll() {
  const findAllQuotes = await this.quotesModule.find();
  return findAllQuotes;
  }

 async findOne(id: string) {
  const findOneQuote = await this.quotesModule.findById(id)
    return findOneQuote;
  }

 async update(id: string, updateQuoteDto: UpdateQuoteDto) {
  const updateQuote = await this.quotesModule.findByIdAndUpdate(id, updateQuoteDto,{new: true})
    return updateQuote;
  }

  async updateWithoutImage(id: string, updateQuoteDto: UpdateQuoteDto) {
    const updateQuote = await this.quotesModule.findByIdAndUpdate(id, updateQuoteDto,{new: true})
      return updateQuote;
    }

 async remove(id: string) {
  const deleteQuote = await this.quotesModule.deleteOne({_id:id})
    return deleteQuote;
  }
}
