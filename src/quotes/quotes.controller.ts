import { Controller, Get, Post, Body, Put, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService,private cloudinary: CloudinaryService,) {}

  @Post()
  
 async create(@Body() createQuoteDto: CreateQuoteDto) {
    const createdQuote = await this.quotesService.create(createQuoteDto)
    return createdQuote;
  }

  @Get()
  findAll() {
    return this.quotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quotesService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto,@UploadedFile() file: Express.Multer.File) {
    const result = await this.cloudinary.uploadImage(file);
    console.log(result);
    updateQuoteDto.voucher = {
    public_id: result.public_id,
    secure_url: result.secure_url,
    };
    return this.quotesService.update(id, updateQuoteDto);
  }
  @Put('update/:id')
  async updateWithoutImage(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quotesService.update(id, updateQuoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quotesService.remove(id);
  }
}
