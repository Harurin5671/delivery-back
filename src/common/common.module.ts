import { Module } from '@nestjs/common';
import { BcryptHashProvider } from './hash/bcrypt-hash/bcrypt-hash';

@Module({
  providers: [BcryptHashProvider],
})
export class CommonModule {}
