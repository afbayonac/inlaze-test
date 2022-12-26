import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log('create', createUserDto);
    const userExist = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (userExist) return;

    const user = await this.userRepository.save(createUserDto);

    return {
      ...user,
      password: '******',
    };
  }
}
