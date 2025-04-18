import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { SellerProfile } from './entities/seller.entity';

@Injectable()
export class SellersService {
  private logger = new Logger(SellersService.name);

  constructor(
    @InjectRepository(SellerProfile)
    private readonly sellerRepository: Repository<SellerProfile>,
  ){
    this.logger.log('SellersService initialized');
  }
  create(createSellerDto: CreateSellerDto, userId: string) {
    return userId;
  }
  findAll() {
    return `This action returns all sellers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seller`;
  }

  update(id: number, updateSellerDto: UpdateSellerDto) {
    return `This action updates a #${id} seller`;
  }

  remove(id: number) {
    return `This action removes a #${id} seller`;
  }
}
