import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

    async validate(payload: JwtPayload): Promise<User> {
      const { id } = payload;
      const user = await this.usersService.findOne(id);
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      const isAdmin = user.role.includes('admin');
      // if (!isAdmin && !user.isActive) {
      //   // Restringir acceso si no es admin y está inactivo
      //   throw new UnauthorizedException('El usuario se encuentra desactivado');
      // }
      return user;
    }
}