import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
// import * as argon from 'argon2';
import { AuthGuard } from '@nestjs/passport';
// import { UserDto } from 'src/user/dto/user.dto';
import { GetUser } from './getUser.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: AuthDto) {
    // console.log({
    //   dto,
    // });
    return this.authService.login(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Req() req) {
    return this.authService.logout(req);
  }

  @HttpCode(HttpStatus.OK)
  @Post('test')
  @UseGuards(AuthGuard('jwt'))
  async test(@GetUser() user) {
    console.log('user is : ', { user });
    // return user;
  }
}
