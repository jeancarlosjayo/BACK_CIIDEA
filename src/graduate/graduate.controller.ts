import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { GraduateService } from './graduate.service';
import { CreateGraduateDto } from './dto/create-graduate.dto';
import { UpdateGraduateDto } from './dto/update-graduate.dto';
import { CommonService } from 'src/utils/common.service';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';

@Controller('graduate')
export class GraduateController {
  constructor(
    private readonly graduateService: GraduateService,
    private readonly usersService : UsersService,
    private readonly commonService: CommonService,
  ) {}

  @Post()
  async create(@Body() createGraduateDto: CreateGraduateDto) {
    const nextCode = await this.graduateService.getNextSequence(
      'graduateSequence',
    );
    const createGraduate = await this.graduateService.create({
      code: `D${this.commonService.completeDigits(nextCode)}`,
      name: createGraduateDto.name,
      startDate: createGraduateDto.startDate,
      endDate: createGraduateDto.endDate,
      status: createGraduateDto.status,
      cost : createGraduateDto.cost,
      sessions: createGraduateDto.sessions
    });
    return createGraduate;
  }

  @Get()
  findAll() {
    return this.graduateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.graduateService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateGraduateDto: UpdateGraduateDto,
  ) {
    return this.graduateService.update(id, updateGraduateDto);
  }

  @Delete(':id')
  async remove(@Res() res: Response,@Param('id') id: string) {
    try {
      const findGraduate = await this.graduateService.findOne(id)
      const usersGraduate = await this.usersService.findUsersByGraduates(findGraduate.code)
      const result = usersGraduate.reduce((acc, obj) =>{acc+=1; return acc;},0)
      if(result != 0){
        res.status(HttpStatus.BAD_REQUEST)
        .send({ message: 'No se puede eliminar un diplomado con usuarios inscritos.' });
      return;
      }else{
        res
          .status(HttpStatus.OK)
          .send({ message: 'Diplomado eliminado.' });
      return this.graduateService.remove(id)
      }
    } catch (error) {
      res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: 'Error interno del servidor.'});
    }

  }
}
