import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './auth/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '0000',
      database: 'graduation_project',
      entities: [AuthEntity],
      synchronize: true, // false가 안전함
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
