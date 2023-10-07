import { Module } from '@nestjs/common';
import { MetadataController } from './metadata.controller';
import { MetadataRepository } from './metadata.repository';
import { MetadataService } from './metadata.service';

@Module({
  controllers: [MetadataController],
  providers: [MetadataService, MetadataRepository],
  exports: [MetadataService],
})
export class MetadataModule {}
