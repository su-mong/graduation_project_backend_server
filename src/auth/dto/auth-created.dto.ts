import { PickType } from '@nestjs/swagger';
import { AuthEntity } from './auth.entity';

export class AuthDto extends PickType(AuthEntity, ['phone', 'code'] as const) {
  constructor(phone: string, code: string) {
    super();
    this.phone = phone;
    this.code = code;
  }
}
