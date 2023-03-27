// create getter decorator for user
// Path: api/src/user/getUser.decorator.ts
import { createParamDecorator } from '@nestjs/common';
// import { UserDto } from 'src/user/dto/user.dto';

import { UserDto } from './dto/user.dto';

//
export const GetUser = createParamDecorator((data, req): UserDto => {
  console.log('req.user', req);
  return req.user;
});
