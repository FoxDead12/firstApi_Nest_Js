import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { DataSource } from 'typeorm';
import { ormconfig } from "../database/ormconfig";
import { UserService } from './services/user.service';
import { TokenService } from './services/token.service';
import { UserPermissionService } from './services/userPermissions.service';
import { ConfigModule } from '@nestjs/config';
import { UserDataService } from './services/userData.service';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, UserService, TokenService, UserPermissionService, UserDataService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
