import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtAuthStrategy } from './strategies/jwt-strategy';
import { BcryptHashProvider } from 'src/common/hash/bcrypt-hash/bcrypt-hash';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy, {
    provide: 'HashProvider',
    useClass: BcryptHashProvider,
  },],
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return {
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '2h' }
      }
    }
  }),
  ],
  exports: [JwtAuthStrategy, PassportModule, JwtModule]
})
export class AuthModule { }
