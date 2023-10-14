import { ApiProperty } from '@nestjs/swagger';
import { MetadataEntity } from './metadata.entity';

export class MetadataDto {
  @ApiProperty({ type: Number })
  itemCount: number;

  @ApiProperty({ type: MetadataEntity, isArray: true })
  data: MetadataEntity[];

  constructor(itemCount: number, data: MetadataEntity[]) {
    this.itemCount = itemCount;
    this.data = data;
  }
}
