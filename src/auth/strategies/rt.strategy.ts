import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtRefreshPayload } from '../types/jwt-refresh-payload.type';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'rt-secret',
      passReqToCallback: true,
    });
      console.log('RtStrategy initialized'); // Should appear on server start
  }

  validate(req: Request, payload: JwtRefreshPayload) {
    const refreshToken = req.get('Authorization')?.replace('Bearer', '').trim();
     console.log('RtStrategy validate called!');
  console.log('Payload from JWT:', payload);
  console.log('Refresh token from header:', refreshToken);
    return {
    sub: Number(payload.sub),
          email: payload.email,
      refreshToken,
    };
  }
}
