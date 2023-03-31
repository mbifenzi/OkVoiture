import {
  Controller,
  FileTypeValidator,
  Injectable,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import * as fs from 'fs';

@Injectable()
@Controller('uploads')
export class UploadsController {
  @Post(':userId/:postId')
  @UseInterceptors(
    FileInterceptor('car_image', {
      dest: './uploads/',
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('userId') userId: string,
    @Param('postId') postId: string,
  ) {
    const userFolderPath = `./uploads/${userId}`;
    const postFolderPath = `${userFolderPath}/${postId}`;

    // create the user folder if it doesn't exist
    if (!fs.existsSync(userFolderPath)) {
      fs.mkdirSync(userFolderPath);
    }

    // create the post folder if it doesn't exist
    if (!fs.existsSync(postFolderPath)) {
      fs.mkdirSync(postFolderPath);
    }

    // move the uploaded file to the post folder
    fs.renameSync(file.path, `${postFolderPath}/${file.originalname}`);

    console.log(file);
  }
}
