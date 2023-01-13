import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { ApiBasicAuth } from '@nestjs/swagger';
import { Public } from 'src/common/public-decorator';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/AuthDto';
import { CreateUserDto } from './dto/CreateUserDto';
import { AccessTokenGuard } from './guards/access-token.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiBasicAuth()
  @Public()
  @Post('signin')
  async login(@Request() req) {
    //async singin(@Body() data: AuthDto) {
    return this.authService.login(req.body);
  }

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user);
  }

  @Public()
  @Post('signup')
  signup(@Body() createUserDto: User) {
    return this.authService.singUp(createUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Request() req) {
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Request() req) {
    const userId = req.user['id'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}