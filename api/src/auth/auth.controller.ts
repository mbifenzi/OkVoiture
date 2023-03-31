import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Options,
  ParseFilePipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
// import * as argon from 'argon2';
import { AuthGuard } from '@nestjs/passport';
// import { UserDto } from 'src/user/dto/user.dto';
import { GetUser } from './getUser.decorator';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from './guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private JwtService: JwtService,
  ) {}

  // @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(dto, res);
  }

  @HttpCode(HttpStatus.OK)
  @Get('me')
  @UseGuards(JwtGuard)
  async user(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cookie = req.cookies['jwt'];
    try {
      const data = await this.JwtService.verifyAsync(cookie, {
        secret: 'secret',
      });
      if (!data) {
        throw new Error('Invalid token');
      }

      console.log('data is : ', { data });
      const user = await this.authService.getUser(data.sub);
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
      return user;
    } catch (e) {
      throw new Error('Invalid token');
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return { message: 'success' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('test')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('car_image', {
      dest: './uploads/',
    }),
  )
  async test(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() dto: AuthDto,
  ) {
    console.log('file is : ', file);
    // return user;
  }
}
