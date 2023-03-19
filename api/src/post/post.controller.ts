import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostService } from './post.service';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Controller('post')
export class PostController {
    constructor(private PostService: PostService) {}

    @Get()
    async findAll() {
        return this.PostService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.PostService.findOne(parseInt(id));
    }

    @Post()
    async create(@Body() createPostDto: CreatePostDto, @Req() req: AuthDto) {
        return this.PostService.create(createPostDto, req);
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
