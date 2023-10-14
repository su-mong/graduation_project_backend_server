import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MetadataService } from './metadata.service';
import { MetadataDto } from './metadata.dto';

@Controller('metadata')
@ApiTags('Metadata API')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Get('/')
  @ApiOperation({ summary: '메타데이터 리스트 얻기' })
  @ApiCreatedResponse({ type: MetadataDto })
  async getAllMetadata(): Promise<MetadataDto> {
    return this.metadataService.getAllMetadata();
  }
}
