import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean } from 'class-validator'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Permission } from './permission.entity'

@Entity()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({ type: String })
    @Column()
    roleName: string

    @ApiProperty({ type: [Permission] })
    @OneToMany(() => Permission, (permission) => permission.role, { eager: true })
    permissions: Permission[]

    @ApiProperty({ type: Boolean })
    @Column()
    @IsBoolean()
    isAdmin: boolean
}
