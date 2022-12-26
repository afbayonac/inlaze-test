import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  createParamDecorator,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

import { Payload } from 'src/auth/auth.strategy';

export const User = createParamDecorator((data, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});

@UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @User() user: Payload) {
    return this.postService.create(createPostDto, user.email);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @User() user: Payload,
  ) {
    return this.postService.update(Number(id), updatePostDto, user.email);
  }
}
