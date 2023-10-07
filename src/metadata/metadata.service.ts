import { Injectable } from '@nestjs/common';
import { MetadataRepository } from './metadata.repository';
import { MetadataEntity } from './metadata.entity';

@Injectable()
export class MetadataService {
  constructor(private readonly metadataRepository: MetadataRepository) {}

  // 전체 메타데이터 가져오기
  async getAllMetadata(): Promise<MetadataEntity[]> {
    return await this.metadataRepository.getAllMetadata();
  }
}
