import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/common/public-decorator';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('google')
export class GoogleAuthController {
    constructor(private readonly authService: AuthService) { }

    //@Public()
    @Get()
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Req() req) {

    }

    //@Public()
    @Get('redirect')
    @UseGuards(GoogleAuthGuard)
    googleAuthRedirect(@Req() req) {
        return this.authService.googleLogin(req)
    }
}