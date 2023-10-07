import { EntityRepository, Repository } from 'typeorm';
import { VersionEntity } from '../entities/version.entity';
import { SystemAvailableEnum, VersionPlatformEnum } from '../../common/util/enum/version.enum';
import { TempVersionInfo } from '../vo/temp.version-info.vo';

@EntityRepository(VersionEntity)
export class VersionRepository extends Repository<VersionEntity> {
    // 특정 플랫폼의 가장 최근 버전 찾기
    async findRecentVersionByPlatform(platform: VersionPlatformEnum): Promise<VersionEntity> {
        return await this.findOne({
            where: { os: platform },
            order: { createdAt: 'DESC' },
        });
    }

    // 특정 플랫폼의 버전 업로드
    async createNewVersion(createVersionDto: TempVersionInfo): Promise<VersionEntity> {
        const version = this.create({
            versionNumber: createVersionDto.versionNumber,
            versionCode: createVersionDto.versionCode,
            os: createVersionDto.os,
            systemAvailable: SystemAvailableEnum.Yes,
        });

        return await this.save(version);
    }

    // 특정 플랫폼의 버전 업로드
    async createNewVersionToCheckout(createVersionDto: TempVersionInfo): Promise<VersionEntity> {
        const version = this.create({
            versionNumber: createVersionDto.versionNumber,
            versionCode: createVersionDto.versionCode,
            os: createVersionDto.os,
            systemAvailable: SystemAvailableEnum.No,
        });

        return await this.save(version);
    }

    // 특정 플랫폼의 버전 업로드
    async createNewVersionToCheckoutDone(createVersionDto: TempVersionInfo): Promise<VersionEntity> {
        const version = this.create({
            versionNumber: createVersionDto.versionNumber,
            versionCode: createVersionDto.versionCode,
            os: createVersionDto.os,
            systemAvailable: SystemAvailableEnum.Yes,
        });

        return await this.save(version);
    }
}
