import { ApiProperty } from '@nestjs/swagger';

export class AuthWithCodeRequestDto {
  @ApiProperty({ type: String })
  phone: string;

  @ApiProperty({ type: String })
  code: string;
}
