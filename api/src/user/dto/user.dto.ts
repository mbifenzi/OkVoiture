import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreatePostDto } from 'src/post/dto';

export class UserDto {
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;
  @IsString()
  lastName: string;

  posts: CreatePostDto[];
}
