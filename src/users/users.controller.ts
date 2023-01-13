import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/common/public-decorator';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
