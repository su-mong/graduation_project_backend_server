import { ApiProperty } from '@nestjs/swagger';

export class AuthCorrectDto {
  @ApiProperty({ type: Boolean })
  isCorrect: boolean;

  constructor(isCorrect: boolean) {
    this.isCorrect = isCorrect;
  }
}
