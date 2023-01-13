import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm'
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator'
import { PersonData } from './person-data.entity'
import { Role } from './role.entity'
import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({ type: String })
    @Column({ length: 50 })
    username: string

    @ApiProperty({ type: String })
    @Column({ length: 500, select: false })
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    //@Matches('/((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/')
    @IsNotEmpty()
    password: string

    @ApiProperty({ type: [Role] })
    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[]

    @ApiProperty({ type: String })
    @Column({ length: 500 })
    @IsEmail()
    email: string

    @ApiProperty({ type: String })
    @Column({ length: 500, nullable: true })
    avatar: string

    @ApiProperty({ type: () => PersonData })
    @OneToOne(() => PersonData, { cascade: true })
    @JoinColumn()
    person: PersonData

    @ApiProperty({ type: String })
    @Column({ length: 500, nullable: true })
    refreshToken: string
}
