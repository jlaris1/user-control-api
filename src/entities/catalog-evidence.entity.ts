import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean } from 'class-validator'
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Document } from './document.entity'

@Entity()
export class CatalogEvidence {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({ type: Boolean })
    @Column()
    @IsBoolean()
    validation: boolean

    @ApiProperty({ type: () => Document })
    @ManyToMany(() => Document)
    @JoinTable()
    documents: Document[]
}
