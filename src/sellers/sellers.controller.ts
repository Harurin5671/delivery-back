import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';

import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AuthDecorator } from 'src/auth/decorators/auth.decorator';

@Controller('sellers')
export class SellersController {
  private logger = new Logger(SellersController.name);
  constructor(private readonly sellersService: SellersService) {
    this.logger.log('SellersController initialized');
  }

  @Post()
  @AuthDecorator()
  create(@Body() createSellerDto: CreateSellerDto, @GetUser('id') userId: string) {
    return this.sellersService.create(createSellerDto, userId);
  }

  @Get()
  findAll() {
    return this.sellersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellersService.update(+id, updateSellerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellersService.remove(+id);
  }
}
