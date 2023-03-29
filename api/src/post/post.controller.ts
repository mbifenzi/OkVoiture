import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';
import { GetUser } from 'src/auth/getUser.decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostService } from './post.service';

@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(private PostService: PostService) {}

  @Get()
  async findAll(
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    // const userId = user.id;
    console.log(user);
    return this.PostService.findAll(user, res);
  }

  @Get(':id')
  async findOne(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.PostService.findOne(parseInt(id));
  }

  @Post()
  async create(@Body() dto: CreatePostDto, @GetUser() user: User) {
    const userId = user.id;
    // console.log(user);
    return this.PostService.create(dto, userId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.PostService.update(parseInt(id), updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.PostService.remove(parseInt(id));
  }
}
