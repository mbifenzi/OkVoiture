import { ForbiddenException, Injectable, Req, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async login(dto: AuthDto, res: Response) {
    console.log('dto is : ', { dto });
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    const valid = await argon.verify(user.hash, dto.password);

    if (!valid) {
      throw new ForbiddenException('Invalid password');
    }
    const token = await this.createToken(user.id, user.email);
    res.cookie('jwt', token.access_token, {
      httpOnly: true,
    });

    return token;
  }

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      // delete user.hash;
      return this.createToken(user.id, user.email);
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('Email already in use');
        } else {
          throw new ForbiddenException('Something went wrong in prisma');
        }
      } else {
        throw new ForbiddenException('Something went wrong');
      }
    }
  }

  async createToken(
    userID: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userID,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: this.config.get('JWT_SECRET'),
    });
    return { access_token: token };
  }

  async getUser(userID: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userID,
      },
    });
  }
}
