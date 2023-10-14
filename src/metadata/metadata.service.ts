import { Injectable } from '@nestjs/common';
import { MetadataRepository } from './metadata.repository';
import { MetadataDto } from './metadata.dto';

@Injectable()
export class MetadataService {
  constructor(private readonly metadataRepository: MetadataRepository) {}

  // 전체 메타데이터 가져오기
  async getAllMetadata(): Promise<MetadataDto> {
    const data = await this.metadataRepository.getAllMetadata();
    return new MetadataDto(data.length, data);
  }
}
