import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dto/CreateUserDto';
import { UpdateUserDto } from 'src/auth/dto/UpdateUserDto';
import { Role } from 'src/entities/role.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['roles', 'roles.permissions', 'person', 'person.address', 'person.contactInfo'] });
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id }, relations: ['roles', 'person'] });
  }

  findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username: username } });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(createUserDto);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) { throw new BadRequestException('User not exist') };


    const response = await this.usersRepository.update(id, { refreshToken: updateUserDto.refreshToken });

    if (response) {
      return this.usersRepository.findOneBy({ id });
    }

    return null;
  }
}
