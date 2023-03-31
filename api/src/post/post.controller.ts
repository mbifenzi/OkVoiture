import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { Response } from 'express';
import { GetUser } from 'src/auth/getUser.decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private PostService: PostService) {}

  @Get('all')
  async findAllPosts(@Res({ passthrough: true }) res: Response) {
    return this.PostService.findAllPosts(res);
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll(
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    // const userId = user.id;
    console.log(user);
    return this.PostService.findAll(user, res);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.PostService.findOne(parseInt(id));
  }

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(FileInterceptor('car_image', { dest: './uploads' }))
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() dto: CreatePostDto,
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = user.id;
    console.log('file is : ', file);
    return this.PostService.create(dto, userId, res, file);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.PostService.update(parseInt(id), updatePostDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.PostService.remove(parseInt(id));
  }
}
