import { Injectable } from '@nestjs/common';
import { AuthCreatedDto } from './dto/auth-created.dto';
import { AuthCorrectDto } from './dto/auth-correct.dto';
import { AuthNumberNotFoundException } from './auth.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  // 인증번호 생성하고 DB에 추가하기
  async makeNewAuthNumber(phone: string): Promise<AuthCreatedDto> {
    // 인증번호 랜덤 생성
    const firstNumber = Math.floor(Math.random() * 10);
    const secondNumber = Math.floor(Math.random() * 10);
    const thirdNumber = Math.floor(Math.random() * 10);
    const fourthNumber = Math.floor(Math.random() * 10);
    const authNumber = `${firstNumber}${secondNumber}${thirdNumber}${fourthNumber}`;

    const result = await this.authRepository.createNewAuthNumber(
      phone,
      authNumber,
    );

    if (result) {
      return new AuthCreatedDto(true);
    } else {
      return new AuthCreatedDto(false);
    }
  }

  // 인증번호가 맞는지 확인하기
  async checkAuthNumberCorrect(
    phone: string,
    code: string,
  ): Promise<AuthCorrectDto> {
    const authNumberPhone = await this.authRepository.findEntityByPhone(phone);

    if (!authNumberPhone) {
      throw new AuthNumberNotFoundException();
    } else if (authNumberPhone.code != code) {
      return new AuthCorrectDto(false);
    } else {
      return new AuthCorrectDto(true);
    }
  }
}
