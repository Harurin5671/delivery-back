// src/common/hash/bcrypt-hash.provider.ts
import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { IHashProvider } from '../hash-provider.interface';

@Injectable()
export class BcryptHashProvider implements IHashProvider {
  private readonly saltRounds = 10;

  async hash(payload: string): Promise<string> {
    return bcrypt.hash(payload, this.saltRounds);
  }

  async compare(payload: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(payload, hashed);
  }
}
