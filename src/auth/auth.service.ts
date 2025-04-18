import { JwtService } from '@nestjs/jwt'; 
import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import { JwtPayload } from './interfaces';
import { LoginDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';
import { RefreshTokenDto } from './dto/refresh-auth.dto';
import { IHashProvider } from 'src/common/hash/hash-provider.interface';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    @Inject('HashProvider')
    private readonly hashProvider: IHashProvider,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    this.logger.log('AuthService initialized');
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);
    const valid = await this.hashProvider.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Credenciales inválidas');
    const token = await this.getJwtToken({ id: user.id });

    return {token};
  }

  async refresh(refreshDto: RefreshTokenDto) {
    const { refreshToken } = refreshDto;
    const token = await this.getJwtToken({ id: refreshToken });
    return { token };
  }

  private async getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
