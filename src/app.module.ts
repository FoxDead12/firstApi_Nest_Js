import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { DataSource } from 'typeorm';
import { ormconfig } from "../database/ormconfig";
import { UserService } from './services/user.service';
import { TokenService } from './services/token.service';
import { UserPermissionService } from './services/userPermissions.service';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig)],
  controllers: [AppController],
  providers: [AppService, UserService, TokenService, UserPermissionService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
