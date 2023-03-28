import { Body, Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';
import { UserDto } from 'src/user/dto/user.dto';
import { GetUser } from 'src/auth/getUser.decorator';
import { Response } from 'express';
import { User } from '@prisma/client';

@Injectable({})
export class PostService {
  constructor(private prismService: PrismaService) {}

  async findAll(user: User, res) {
    return this.prismService.post.findMany({
      where: { authorId: user.id },
    });

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  }

  findOne(id: number) {
    return this.prismService.post.findUnique({
      where: { id: id },
    });
  }

  create(createPostDto: CreatePostDto, userId: number) {
    const post = this.prismService.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        author: {
          connect: { id: userId },
        },
      },
    });

    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prismService.post.update({
      where: { id: id },
      data: updatePostDto,
    });
  }

  remove(id: number) {
    return this.prismService.post.delete({
      where: { id: id },
    });
  }
}
