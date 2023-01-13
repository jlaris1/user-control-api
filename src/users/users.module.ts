import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../entities/user.entity';
import { Address } from 'src/entities/address.entity';
import { CatalogEvidence } from 'src/entities/catalog-evidence.entity';
import { ContactData } from 'src/entities/contact-data.entity';
import { Document } from 'src/entities/document.entity';
import { LegalDocument } from 'src/entities/legal-document.entity ';
import { LegalPerson } from 'src/entities/legal-person.entity';
import { Permission } from 'src/entities/permission.entity';
import { PersonData } from 'src/entities/person-data.entity';
import { Role } from 'src/entities/role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Address, CatalogEvidence, ContactData, Document, LegalDocument, LegalPerson, Permission, PersonData, Role])],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule { }