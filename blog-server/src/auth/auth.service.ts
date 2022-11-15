import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private service: UsersService, private jwtService: JwtService) {}

  async signup(email: string, password: string) {
    const isExisted = await this.checkIfUserExisted(email);

    if (isExisted) {
      throw new BadRequestException('email is already in use');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = salt + '.' + hash.toString('hex');

    const user = await this.service.create(email, hashedPassword);
    return user;
  }

  private async checkIfUserExisted(email) {
    try {
      const existedUser = await this.service.findOne(email);
      return existedUser && true;
    } catch (_) {
      return false;
    }
  }

  async signin(email: string, password: string) {
    const user = await this.service.findOne(email);

    const [salt, storeHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storeHash !== hash.toString('hex')) {
      throw new BadRequestException('Password Incorrect');
    }

    delete user.password;
    const payload = { user };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }
}
