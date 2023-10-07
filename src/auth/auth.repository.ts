import { DataSource, Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository {
  private authRepository: Repository<AuthEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.authRepository = this.dataSource.getRepository(AuthEntity);
  }

  // 전화번호-인증번호 한 쌍 생성 or 수정
  async createNewAuthNumber(phone: string, code: string): Promise<AuthEntity> {
    const findResult = await this.authRepository.findOne({
      where: { phone: phone },
    });

    if (findResult) {
      await this.authRepository.update({ phone: phone }, { code: code });

      return await this.authRepository.findOne({
        where: { phone: phone },
      });
    } else {
      const newAuth = this.authRepository.create({
        phone: phone,
        code: code,
      });

      return await this.authRepository.save(newAuth);
    }
  }

  // 전화번호에 해당하는 entity 찾기
  async findEntityByPhone(phone: string): Promise<AuthEntity> {
    return await this.authRepository.findOne({
      where: { phone: phone },
    });
  }
}
