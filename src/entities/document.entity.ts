import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Document {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({ type: String })
    @Column()
    name: string

    @ApiProperty({ type: String })
    @Column()
    url: string
}
