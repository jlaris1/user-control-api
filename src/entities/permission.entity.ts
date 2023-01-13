import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean } from 'class-validator'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Role } from './role.entity'

@Entity()
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({ type: String })
    @Column()
    name: string

    @ApiProperty({ type: Boolean })
    @Column()
    @IsBoolean()
    validation: boolean

    @ApiProperty({ type: () => Role })
    @ManyToOne(() => Role, (role) => role.permissions)
    role: Role
}
