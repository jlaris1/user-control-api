import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { PersonData } from 'src/entities/person-data.entity';
import { Role } from 'src/entities/role.entity';
export class CreateUserDto {
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(16)
    //@Matches('/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/')
    @IsNotEmpty()
    password: string;

    roles: Role[];

    @IsEmail()
    email: string;

    avatar: string;

    person: PersonData;

    refreshToken: string;
}