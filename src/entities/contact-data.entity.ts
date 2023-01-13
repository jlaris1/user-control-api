import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ContactData {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({ type: String })
    @Column()
    email: string

    @ApiProperty({ type: String })
    @Column()
    phone: string
}
