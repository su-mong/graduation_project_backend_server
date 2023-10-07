import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MetadataService } from './metadata.service';
import { MetadataEntity } from './metadata.entity';

@Controller('metadata')
@ApiTags('Metadata API')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Get('/')
  @ApiOperation({ summary: '메타데이터 리스트 얻기' })
  @ApiCreatedResponse({ type: MetadataEntity, isArray: true })
  async getAllMetadata(): Promise<MetadataEntity[]> {
    return this.metadataService.getAllMetadata();
  }
}
