import { Body, Controller } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Get, Post } from '../bases/utils/http-method.decorator';
import { VersionService } from './version.service';
import { GetAndroidRes } from './dto/reponse/get.android.res';
import { PostIosReq } from './dto/request/post.ios.req';
import { VersionPlatformEnum } from '../common/util/enum/version.enum';
import { GetIosRes } from './dto/reponse/get.ios.res';
import { PostIosRes } from './dto/reponse/post.ios.res';
import { PostAndroidRes } from './dto/reponse/post.android.res';
import { PostAndroidReq } from './dto/request/post.android.req';
import { PostStopRes } from './dto/reponse/post.stop.res';
import { PostStartServerRes } from './dto/reponse/post.start-server.res';
import { Roles } from 'src/common/decorators/auth.decorators';

@Controller('version')
@ApiTags('Version API')
export class VersionController {
    constructor(private readonly versionService: VersionService) {}

    @Get({ endPoint: '/android', summary: '안드로이드 앱 버전을 얻어옴.', type: GetAndroidRes })
    async getRecentAndroidVersion(): Promise<GetAndroidRes> {
        return await this.versionService.getAndroidRecentVersion();
    }

    @Get({ endPoint: '/ios', summary: 'iOS 앱 버전을 얻어옴.', type: GetIosRes })
    async getRecentIOSVersion(): Promise<GetIosRes> {
        return await this.versionService.getIOSRecentVersion();
    }

    @Post({ endPoint: '/android', summary: '새로운 안드로이드 앱 버전 추가', type: PostAndroidRes })
    @Roles('admin')
    @ApiSecurity('Authorization')
    async registerNewAndroidVersion(@Body() req: PostAndroidReq): Promise<PostAndroidRes> {
        return await this.versionService.registerNewVersionWithParams(req, VersionPlatformEnum.android);
    }

    @Post({ endPoint: '/ios', summary: '새로운 iOS 앱 버전 추가', type: PostIosRes })
    @Roles('admin')
    @ApiSecurity('Authorization')
    async registerNewIOSVersion(@Body() req: PostIosReq): Promise<PostIosRes> {
        return await this.versionService.registerNewVersionWithParams(req, VersionPlatformEnum.iOS);
    }

    @Post({ endPoint: '/stop', summary: '서버 점검 시작', type: PostStopRes })
    @Roles('admin')
    @ApiSecurity('Authorization')
    async stopToCheckSystem(): Promise<PostStopRes[]> {
        const iOS = await this.versionService.stopToCheckSystemiOS();
        const android = await this.versionService.stopToCheckSystemAndroid();
        return [iOS, android];
    }

    @Post({ endPoint: '/start-server', summary: '서버 점검 종료 (서버 활성화)', type: PostStartServerRes })
    @Roles('admin')
    @ApiSecurity('Authorization')
    async finishCheckoutiOS(): Promise<PostStartServerRes[]> {
        const iOS = await this.versionService.finishCheckoutiOS();
        const android = await this.versionService.finishCheckoutAndroid();
        return [iOS, android];
    }
}
