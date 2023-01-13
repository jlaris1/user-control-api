import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class LegalDocument {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({ type: String })
    @Column()
    type: string

    @ApiProperty({ type: String })
    @Column()
    comment: string

    @ApiProperty({ type: Boolean })
    @Column()
    @IsBoolean()
    validation: boolean
}
