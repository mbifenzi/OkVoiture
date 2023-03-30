import { Controller, Post } from '@nestjs/common';

@Controller('uploads')
export class UploadsController {
  @Post()
  useInterceptors(FileInterceptor('file')) {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
            return cb(null, `${randomName}${extname(file.originalname)}`);
        },
        });
    }
}
    
