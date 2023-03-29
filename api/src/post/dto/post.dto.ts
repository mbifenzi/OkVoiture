import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  car_model: string;

  @IsNotEmpty()
  @IsString()
  car_year: string;

  @IsNotEmpty()
  @IsString()
  car_color: string;

  @IsNotEmpty()
  @IsString()
  car_price: string;

  @IsNotEmpty()
  @IsString()
  car_description: string;

  @IsNotEmpty()
  @IsString()
  car_image: string;

  @IsNotEmpty()
  @IsString()
  link: string;
}

export class UpdatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  car_model: string;

  @IsNotEmpty()
  @IsString()
  car_year: string;

  @IsNotEmpty()
  @IsString()
  car_color: string;

  @IsNotEmpty()
  @IsString()
  car_price: string;

  @IsNotEmpty()
  @IsString()
  car_description: string;

  @IsNotEmpty()
  @IsString()
  car_image: string;

  @IsNotEmpty()
  @IsString()
  link: string;
}
