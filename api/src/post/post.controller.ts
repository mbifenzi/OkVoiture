import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto';

@Controller('post')
export class PostController {
    constructor(private readonly prismService: PrismaService) {

    }

    @Get()
    async findAll() {
        return this.prismService.post.findMany();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.prismService.post.findUnique({
            where: { id: Number(id) },
        });
    }

    @Post()
    async create(@Body() createPostDto: CreatePostDto) {
        return this.prismService.post.create({
            data: createPostDto,
        });
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
        return this.prismService.post.update({
            where: { id: Number(id) },
            data: updatePostDto,
        });
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.prismService.post.delete({
            where: { id: Number(id) },
        });
    }
    
}
