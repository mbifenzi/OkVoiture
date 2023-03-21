import { Body, Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';
import { UserDto } from 'src/user/dto/user.dto';
import { GetUser } from 'src/auth/getUser.decorator';

@Injectable()
export class PostService {
  constructor(private prismService: PrismaService) {}

  findAll() {
    return this.prismService.post.findMany();
  }

  findOne(id: number) {
    return this.prismService.post.findUnique({
      where: { id: String(id) },
    });
  }

  create(createPostDto: CreatePostDto, User: UserDto) {
    createPostDto.authorId = User.id;
    return this.prismService.post.create({
      data: createPostDto,
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prismService.post.update({
      where: { id: String(id) },
      data: updatePostDto,
    });
  }

  remove(id: number) {
    return this.prismService.post.delete({
      where: { id: String(id) },
    });
  }
}
