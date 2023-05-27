import { Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthResponse, PayloadToken } from 'src/interfaces/auth.interface';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}
    public async validateUser(
        username: string,
        password: string,
      ): Promise<UsersEntity | null> {
        const userByUsername = await this.userService.findBy({
          key: 'username',
          value: username,
        });
        const userByEmail = await this.userService.findBy({
          key: 'email',
          value: username,
        });
    
        if (userByUsername) {
          const match = await bcrypt.compare(password, userByUsername.password);
          if (match) return userByUsername;
        }
    
        if (userByEmail) {
          const match = await bcrypt.compare(password, userByEmail.password);
          if (match) return userByEmail;
        }
    
        return null;
    }
    public signJWT({
        payload,
        secret,
        expires,
      }: {
        payload: jwt.JwtPayload;
        secret: string;
        expires: number | string;
      }): string {
        return jwt.sign(payload, secret, { expiresIn: expires });
    }

    public async generateJWT(user: UsersEntity): Promise<AuthResponse> {
        const getUser = await this.userService.findUserById(user.id);
    
        const payload: PayloadToken = {
          role: getUser.role,
          sub: getUser.id,
        };
    
        return {
          accessToken: this.signJWT({
            payload,
            secret: process.env.JWT_SECRET,
            expires: '1h',
          }),
          user,
        };
    }
}
