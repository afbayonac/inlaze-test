import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto, email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) return;

    return this.postRepository.save({
      ...createPostDto,
      user,
    });
  }

  async findAll() {
    return await this.postRepository.find();
  }

  async findOne(id: number) {
    return await this.postRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) return;

    return this.postRepository.findOne({
      where: { user },
      relations: {
        user: true,
      },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto, email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    const post = await this.postRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });

    if (!user) return;
    if (!post) return;

    if (user.email !== post.user.email) return;

    return await this.postRepository.save({ ...post, ...updatePostDto, user });
  }
}
