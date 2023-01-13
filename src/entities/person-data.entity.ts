import { ApiProperty } from '@nestjs/swagger'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm'
import { Address } from './address.entity'
import { ContactData } from './contact-data.entity'

@Entity()
export class PersonData {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({ type: String })
    @Column({ length: 500 })
    name: string

    @ApiProperty({ type: String })
    @Column({ length: 500, nullable: true })
    secondName: string

    @ApiProperty({ type: String })
    @Column({ length: 500 })
    lastName: string

    @ApiProperty({ type: () => Address })
    @OneToOne(() => Address, { cascade: true, eager: true })
    @JoinColumn()
    address: Address

    @ApiProperty({ type: () => ContactData })
    @OneToOne(() => ContactData, { cascade: true, eager: true })
    @JoinColumn()
    contactInfo: ContactData
}
