import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { CreateUserDto } from './dto/CreateUserDto';
import { jwtConstants } from './constants';
import { AuthDto } from './dto/AuthDto';
import { UserDto } from './dto/UserDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.update(userId, { refreshToken: hashedRefreshToken });
  }

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('username', username, 'pass', pass);

    const user = await this.usersService.findByUsername(username);

    if (!user) throw new BadRequestException('User does not exist');

    console.log(user);

    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return new BadRequestException('Invalid credentials');
  }

  async login(data: AuthDto) {
    const user = await this.usersService.findByUsername(data.username);

    if (!user) throw new BadRequestException('User does not exist');

    const passwordMatches = await argon2.verify(user.password, data.password);

    if (!passwordMatches) throw new BadRequestException('Password is incorrect');

    const tokens = await this.getTokens(user.id, user.username);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async singUp(createDto: CreateUserDto) {
    const userExist = await this.usersService.findByUsername(createDto.username);

    if (userExist) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const hash = await this.hashData(createDto.password);
    const newUser = await this.usersService.create({
      ...createDto,
      password: hash
    });

    const tokens = await this.getTokens(newUser.id, newUser.username);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);

    return tokens;
  }

  async logout(id: string) {
    return this.usersService.update(id, { refreshToken: null });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findOne(userId);

    if (!user || !user.refreshToken) throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken);

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async getProfile(user: UserDto) {
    return await this.usersService.findOne(user.userId);
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }

}
