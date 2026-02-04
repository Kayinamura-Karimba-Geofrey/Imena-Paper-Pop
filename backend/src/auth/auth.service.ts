import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async login(user: any) {
        if (user.username === 'imena' && user.password === 'family') {
            const payload = { username: user.username, sub: 1 };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        throw new UnauthorizedException('Invalid credentials');
    }
}
