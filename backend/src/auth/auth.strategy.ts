import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'my-secret-love',
    });
  }

  async validate(payload: any) {
    return {
      email: payload.email,
      name: payload.name,
      nickname: payload.nickname,
    };
  }
}

export interface Payload {
  email: string;
  name: string;
  nickname: string;
}
