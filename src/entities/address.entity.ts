import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNumber } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({ type: String })
    @Column({ length: 500 })
    street: string

    @ApiProperty({ type: String })
    @Column({ length: 500 })
    city: string

    @ApiProperty({ type: Number })
    @IsNumber()
    postalCode: number

    @ApiProperty({ type: String })
    @Column({ length: 500 })
    country: string

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    validate: boolean

    @ApiProperty({ type: String })
    @Column({ length: 500 })
    outputAsLabel: string
}
