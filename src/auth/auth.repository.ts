import { DataSource, EntityRepository, Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { Injectable } from '@nestjs/common';

// @EntityRepository(AuthEntity)
@Injectable()
export class AuthRepository {
  //extends Repository<AuthEntity> {
  private boardsRepository: Repository<AuthEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.boardsRepository = this.dataSource.getRepository(AuthEntity);
  }

  // 전화번호-인증번호 한 쌍 생성 or 수정
  async createNewAuthNumber(phone: string, code: string): Promise<AuthEntity> {
    const findResult = await this.boardsRepository.findOne({
      where: { phone: phone },
    });

    if (findResult) {
      await this.boardsRepository.update({ phone: phone }, { code: code });

      return await this.boardsRepository.findOne({
        where: { phone: phone },
      });
    } else {
      const newAuth = this.boardsRepository.create({
        phone: phone,
        code: code,
      });

      return await this.boardsRepository.save(newAuth);
    }
  }

  // 전화번호에 해당하는 entity 찾기
  async findEntityByPhone(phone: string): Promise<AuthEntity> {
    return await this.boardsRepository.findOne({
      where: { phone: phone },
    });
  }
}
