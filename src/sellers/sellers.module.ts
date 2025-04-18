import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersController } from './sellers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerProfile } from './entities/seller.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [SellersController],
  providers: [SellersService],
  imports: [TypeOrmModule.forFeature([SellerProfile]), AuthModule, UsersModule],
})
export class SellersModule { }
