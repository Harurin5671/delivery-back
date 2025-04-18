import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IHashProvider } from 'src/common/hash/hash-provider.interface';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(
    @Inject('HashProvider')
    private readonly hashProvider: IHashProvider,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.logger.log('UsersService initialized');
  }

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;
    const hash = await this.hashProvider.hash(password);
    const user = this.userRepository.create({
      ...userData,
      password: hash,
    })
    await this.userRepository.save(user);
    return 'User created';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(term: string): Promise<User> {
    const qb = this.userRepository.createQueryBuilder('u')
      .where('CAST(u.id AS TEXT) = :term', { term })
      .orWhere('u.email = :term', { term });

    try {
      const user = await qb.getOne();
      if (!user) {
        throw new BadRequestException(`Usuario "${term}" no encontrado`);
      }
      delete (user as any).password;
      return user;
    } catch (error) {
      this.logger.error(`Error buscando user "${term}"`, error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role'],  // incluimos password
    });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
