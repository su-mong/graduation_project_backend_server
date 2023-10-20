import { Injectable, Logger } from '@nestjs/common';
import { MetadataRepository } from './metadata.repository';
import { MetadataDto } from './metadata.dto';

@Injectable()
export class MetadataService {
  private readonly logger = new Logger(MetadataService.name);

  constructor(private readonly metadataRepository: MetadataRepository) {}

  // 전체 메타데이터 가져오기
  async getAllMetadata(): Promise<MetadataDto> {
    this.logger.debug(`🚨 getAllMetadata called`);
    const data = await this.metadataRepository.getAllMetadata();
    return new MetadataDto(data.length, data);
  }
}
