import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quote, QuoteSchema } from './schema/quote.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Quote.name,
        schema: QuoteSchema,
      },
    ]),
    CloudinaryModule
  ],
  controllers: [QuotesController],
  providers: [QuotesService]
})
export class QuotesModule {}
