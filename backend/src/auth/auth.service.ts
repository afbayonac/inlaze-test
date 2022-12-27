import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtAuthService: JwtService,
  ) {}

  async login(LoginAuthBody: LoginAuthDto) {
    const { email, password } = LoginAuthBody;
    console.log({ email, password });
    const user = await this.userRepository.findOne({
      where: { email },
    });

    console.log({ user });
    if (!user) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    if (user?.password !== password)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    console.log('ok');
    return this.jwtAuthService.sign({
      name: user.name,
      email: user.email,
      nickname: user.nickname,
    });
  }
}
