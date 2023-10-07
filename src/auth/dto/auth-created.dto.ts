import { ApiProperty } from '@nestjs/swagger';

export class AuthCreatedDto {
  @ApiProperty({ type: Boolean })
  isCreated: boolean;

  constructor(isCreated: boolean) {
    this.isCreated = isCreated;
  }
}
