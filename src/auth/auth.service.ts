import axios from 'axios';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { AuthCreatedDto } from './dto/auth-created.dto';
import { AuthCorrectDto } from './dto/auth-correct.dto';
import { AuthNumberNotFoundException } from './auth.exception';
import { AuthRepository } from './auth.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly authRepository: AuthRepository,
  ) {}

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
      try {
        const timestamp = Date.now().toString();
        const urlSuffix =
          '/sms/v2/services/ncp:sms:kr:311143956827:graduation_project/messages'; // url (include query string)

        const response = await axios.post(
          `https://sens.apigw.ntruss.com${urlSuffix}`,
          {
            type: 'SMS',
            contentType: 'COMM',
            countryCode: '82',
            from: '01022851094',
            content: `인증번호는 ${authNumber}입니다.`,
            messages: [
              {
                to: phone,
              },
            ],
          },
          {
            headers: {
              contentType: 'application/json; charset=utf-8',
              'x-ncp-apigw-timestamp': timestamp,
              'x-ncp-iam-access-key':
                this.configService.get('NCLOUD_ACCESS_KEY'),
              'x-ncp-apigw-signature-v2': this._makeSignature(
                timestamp,
                urlSuffix,
              ),
            },
          },
        );

        if (response.data.statusName == 'success') {
          return new AuthCreatedDto(true);
        } else {
          return new AuthCreatedDto(false);
        }
        // Handle the response
      } catch (error) {
        return new AuthCreatedDto(false);
      }
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

  private _makeSignature(timestamp: string, url: string): string {
    const space = ' ';
    const newLine = '\n';
    const method = 'POST';

    const message = [];
    const hmac = crypto.createHmac(
      'sha256',
      this.configService.get('NCLOUD_SECRET_KEY'),
    );
    message.push(method);
    message.push(space);
    message.push(url);
    message.push(newLine);
    message.push(timestamp);
    message.push(newLine);
    message.push(this.configService.get('NCLOUD_ACCESS_KEY'));
    //message 배열에 위의 내용들을 담아준 후에
    const signature = hmac.update(message.join('')).digest('base64');
    //message.join('') 으로 만들어진 string 을 hmac 에 담고, base64로 인코딩한다
    return signature.toString(); // toString()이 없었어서 에러가 자꾸 났었는데, 반드시 고쳐야함.
  }
}
