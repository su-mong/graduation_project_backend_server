import { NotFoundException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class AuthNumberNotFoundException extends NotFoundException {
  constructor() {
    super('90001');
  }
  @ApiProperty()
  timestamp: string;
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
}
