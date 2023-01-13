import { ApiProperty } from '@nestjs/swagger'
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CatalogEvidence } from './catalog-evidence.entity'
import { LegalDocument } from './legal-document.entity '
import { PersonData } from './person-data.entity'

@Entity()
export class LegalPerson {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({ type: () => PersonData })
    @OneToOne(() => PersonData)
    @JoinColumn()
    person: PersonData

    @ApiProperty({ type: () => CatalogEvidence })
    @OneToOne(() => CatalogEvidence)
    @JoinColumn()
    catalogEvidence: CatalogEvidence

    @ApiProperty({ type: () => LegalDocument })
    @OneToOne(() => LegalDocument)
    @JoinColumn()
    legalDocument: LegalDocument
}
