import { Injectable } from '@nestjs/common';
import { VersionRepository } from './repositories/version.repository';
import { GetAndroidRes } from './dto/reponse/get.android.res';
import { VersionPlatformEnum } from '../common/util/enum/version.enum';
import { PostIosReq } from './dto/request/post.ios.req';
import { GetIosRes } from './dto/reponse/get.ios.res';
import { PostStopRes } from './dto/reponse/post.stop.res';
import { PostStartServerRes } from './dto/reponse/post.start-server.res';
import { TempVersionInfo } from './vo/temp.version-info.vo';

@Injectable()
export class VersionService {
    constructor(private versionRepository: VersionRepository) {}

    // 안드로이드 최신 버전 가져오기
    async getAndroidRecentVersion(): Promise<GetAndroidRes> {
        const version = await this.versionRepository.findRecentVersionByPlatform(VersionPlatformEnum.android);
        return new GetAndroidRes(version.versionNumber, version.versionCode, version.systemAvailable);
    }

    // iOS 최신 버전 가져오기
    async getIOSRecentVersion(): Promise<GetIosRes> {
        const version = await this.versionRepository.findRecentVersionByPlatform(VersionPlatformEnum.iOS);
        return new GetIosRes(version.versionNumber, version.versionCode, version.systemAvailable);
    }

    // 최신 버전 등록하기(DTO 받음)
    async registerNewVersionWithParams(body: PostIosReq, os: VersionPlatformEnum) {
        const request = new TempVersionInfo(body.versionNumber, body.versionCode, os);
        const newVersion = await this.versionRepository.createNewVersion(request);
        return {
            versionCode: newVersion.versionCode,
            versionNumber: newVersion.versionNumber,
            systemAvailable: newVersion.systemAvailable,
        };
    }

    // iOS 서버점검 체크
    async stopToCheckSystemiOS(): Promise<PostStopRes> {
        const iOS = await this.versionRepository.findRecentVersionByPlatform(VersionPlatformEnum.iOS);
        const request = new TempVersionInfo(iOS.versionNumber, iOS.versionCode, iOS.os);
        const newVersion = await this.versionRepository.createNewVersionToCheckout(request);
        return new PostStopRes(newVersion.versionNumber, newVersion.versionCode, newVersion.systemAvailable);
    }

    // android 서버점검 체크
    async stopToCheckSystemAndroid(): Promise<PostStopRes> {
        const android = await this.versionRepository.findRecentVersionByPlatform(VersionPlatformEnum.android);
        const request = new TempVersionInfo(android.versionNumber, android.versionCode, android.os);
        const newVersion = await this.versionRepository.createNewVersionToCheckout(request);
        return new PostStopRes(newVersion.versionNumber, newVersion.versionCode, newVersion.systemAvailable);
    }

    // iOS 서버점검 체크
    async finishCheckoutiOS(): Promise<PostStartServerRes> {
        const iOS = await this.versionRepository.findRecentVersionByPlatform(VersionPlatformEnum.iOS);
        const request = new TempVersionInfo(iOS.versionNumber, iOS.versionCode, iOS.os);
        const newVersion = await this.versionRepository.createNewVersionToCheckoutDone(request);
        return new PostStartServerRes(newVersion.versionNumber, newVersion.versionCode, newVersion.systemAvailable);
    }

    // android 서버점검 체크
    async finishCheckoutAndroid(): Promise<PostStartServerRes> {
        const android = await this.versionRepository.findRecentVersionByPlatform(VersionPlatformEnum.android);
        const request = new TempVersionInfo(android.versionNumber, android.versionCode, android.os);
        const newVersion = await this.versionRepository.createNewVersionToCheckoutDone(request);
        return new PostStartServerRes(newVersion.versionNumber, newVersion.versionCode, newVersion.systemAvailable);
    }

    /*
  // 안드로이드 최신 버전 등록하기(기존 버전에서 1 증가시킴.)
  async registerNewAndroidVersion(): Promise<ReadVersionDto> {
    const currentVersion = await this.versionRepository.findRecentVersionByPlatform(VersionPlatformEnum.android);
    const currentVersionCodeArray = currentVersion.versionCode.split('.');

    const request = new CreateVersionDto();
    request.versionNumber = currentVersion.versionNumber + 1;
    request.versionCode = currentVersionCodeArray[0] + '.' + currentVersionCodeArray[1] + '.' + request.versionNumber;
    request.os = VersionPlatformEnum.android;

    const newVersion = await this.versionRepository.createNewVersion(request);

    const response = new ReadVersionDto();
    response.versionNumber = newVersion.versionNumber;
    response.versionCode = newVersion.versionCode;

    return response;
  }

  // iOS 최신 버전 등록하기(기존 버전에서 1 증가시킴.)
  async registerNewIOSVersion(): Promise<ReadVersionDto> {
    const currentVersion = await this.versionRepository.findRecentVersionByPlatform(VersionPlatformEnum.iOS);
    const currentVersionCodeArray = currentVersion.versionCode.split('.');

    const request = new CreateVersionDto();
    request.versionNumber = currentVersion.versionNumber + 1;
    request.versionCode = currentVersionCodeArray[0] + '.' + currentVersionCodeArray[1] + '.' + request.versionNumber;
    request.os = VersionPlatformEnum.iOS;

    const newVersion = await this.versionRepository.createNewVersion(request);

    const response = new ReadVersionDto();
    response.versionNumber = newVersion.versionNumber;
    response.versionCode = newVersion.versionCode;

    return response;
  }*/
}
