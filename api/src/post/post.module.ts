import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UploadsController } from './uploads/uploads.controller';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [UploadsModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
