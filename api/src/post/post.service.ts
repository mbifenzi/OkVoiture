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

  findAllPosts(res: Response) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    return this.prismService.post.findMany();
  }

  findAll(user: User, res: Response) {
    const posts = this.prismService.post.findMany({
      where: { authorId: user.id },
    });

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    return posts;
  }

  findOne(id: number) {
    return this.prismService.post.findUnique({
      where: { id: id },
    });
  }

  async create(createPostDto: CreatePostDto, userId: number, res: Response) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    const post = await this.prismService.post.create({
      data: {
        car_name: createPostDto.title,
        car_model: createPostDto.car_model,
        car_year: createPostDto.car_year,
        car_color: createPostDto.car_color,
        car_price: createPostDto.car_price,
        car_description: createPostDto.car_description,
        car_image: createPostDto.car_image,
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
