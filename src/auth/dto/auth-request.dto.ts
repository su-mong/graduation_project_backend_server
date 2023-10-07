import { ApiProperty } from '@nestjs/swagger';

export class AuthRequestDto {
  @ApiProperty({ type: String })
  phone: string;
}
