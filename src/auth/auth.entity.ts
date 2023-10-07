import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from '../../bases/entities/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { SystemAvailableEnum, VersionPlatformEnum } from '../../common/util/enum/version.enum';
import { versionentityMeta } from './meta/version.entity.meta';

@Entity({ name: versionentityMeta.table })
export class VersionEntity extends CustomBaseEntity {
    @PrimaryGeneratedColumn({ name: versionentityMeta.column.id })
    @ApiProperty()
    id: number;

    @Column({ name: versionentityMeta.column.versionNumber, nullable: false })
    @ApiProperty()
    versionNumber: number;

    @Column({ name: versionentityMeta.column.versionCode, nullable: false })
    @ApiProperty()
    versionCode: string;

    @Column({ name: versionentityMeta.column.systemAvailable, type: 'enum', default: SystemAvailableEnum.Yes, enum: SystemAvailableEnum })
    systemAvailable: SystemAvailableEnum;

    @Column({ name: versionentityMeta.column.os, type: 'enum', enum: VersionPlatformEnum })
    @ApiProperty()
    os: VersionPlatformEnum;
}
