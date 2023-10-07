import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { MetadataEntity } from './metadata.entity';

@Injectable()
export class MetadataRepository {
  private metadataRepository: Repository<MetadataEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.metadataRepository = this.dataSource.getRepository(MetadataEntity);
  }

  // 전체 metadata 리스트
  async getAllMetadata(): Promise<MetadataEntity[]> {
    return this.metadataRepository.find();
  }
}
