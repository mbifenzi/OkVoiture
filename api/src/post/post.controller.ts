import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/getUser.decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserDto } from 'src/user/dto/user.dto';

import { CreatePostDto, UpdatePostDto } from './dto';
import { PostService } from './post.service';

@Controller('post')
@UseGuards(JwtGuard)
export class PostController {
  constructor(private PostService: PostService) {}

  @Get()
  async findAll(@GetUser('id') userId: string) {
    return this.PostService.findAll();
  }

  @Get(':id')
  async findOne(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.PostService.findOne(parseInt(id));
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto, @GetUser() user: UserDto) {
    return this.PostService.create(createPostDto, user);
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
