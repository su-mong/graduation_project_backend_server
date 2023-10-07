import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCreatedDto } from './dto/auth-created.dto';
import { AuthRequestDto } from './dto/auth-request.dto';
import { AuthCorrectDto } from './dto/auth-correct.dto';
import { AuthWithCodeRequestDto } from './dto/auth-with-code-request.dto';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/request_code')
  @ApiOperation({ summary: '인증번호 발송' })
  @ApiCreatedResponse({ type: AuthCreatedDto })
  async postNewAuthNumber(
    @Body() req: AuthRequestDto,
  ): Promise<AuthCreatedDto> {
    return this.authService.makeNewAuthNumber(req.phone);
  }

  @Post('/validate_code')
  @ApiOperation({ summary: '인증번호와 전화번호가 일치하는지 확인' })
  @ApiCreatedResponse({ type: AuthCorrectDto })
  async checkAuthNumberCorrect(
    @Body() req: AuthWithCodeRequestDto,
  ): Promise<AuthCorrectDto> {
    return this.authService.checkAuthNumberCorrect(req.phone, req.code);
  }
}
