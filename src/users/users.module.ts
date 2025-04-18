import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BcryptHashProvider } from 'src/common/hash/bcrypt-hash/bcrypt-hash';

@Module({
  controllers: [UsersController,],
  providers: [UsersService, {
    provide: 'HashProvider',
    useClass: BcryptHashProvider,
  }],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService]
})
export class UsersModule { }
