import { IsEmail, isNotEmpty, IsNotEmpty, IsNumber, isNumber, isString, IsString } from 'class-validator';

export class CreatePostDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;
    published: boolean;
    authorId: string;
}

export class UpdatePostDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;
}
