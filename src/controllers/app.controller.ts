import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseFilters, UseGuards } from '@nestjs/common';
import { request } from 'http';
import { USERS } from '../endpoints';
import { HasOne, PermissionsGuard, Token } from '../guards/PermissionsGuard.guard';
import { UserAlreadyExisteExceptionFilter } from '../models/exceptions-filters/UserAlreadyExisteExceptionFilter';
import { UserAlreadyHavePersonalInfoExceptionFilter } from '../models/exceptions-filters/UserAlreadyHavePersonalInfoExceptionFilter';
import { UserNotFoundExceptionFilter } from '../models/exceptions-filters/UserNotFoundExceptionFilter';
import { Permission } from '../models/Permissions';
import { AddPersonalInformationRequest } from '../models/request/AddPersonalInformationRequest';
import { AuthRequest } from '../models/request/AuthRequest';
import { ChangePasswordRequest } from '../models/request/ChangePasswordRequest';
import { CreateNewUserRequest } from '../models/request/CreateNewUserRequest';
import { AppService } from '../services/app.service';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';
import { UserDataService } from '../services/userData.service';
import { UserPermissionService } from '../services/userPermissions.service';

@Controller(USERS.BASE)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly userDataService: UserDataService,
  ) {}


  @Post()
  @UseGuards(PermissionsGuard)
  @HasOne(Permission.ADMIN, Permission.MANAGER)
  @UseFilters(new UserAlreadyExisteExceptionFilter())
  createNewUser(@Body() request: CreateNewUserRequest){
    return this.userService.createNewUser(request);
  }

  @Post(USERS.AUTH)
  @UseFilters(UserNotFoundExceptionFilter)
  auth(@Body() request: AuthRequest){

    return this.userService.auth(request);
  }

  @Post(USERS.CHANGEPASSWORD)
  @UseGuards(PermissionsGuard)
  @HasOne(Permission.ADMIN, Permission.MANAGER, Permission.CONSULTANT)
  @UseFilters(UserNotFoundExceptionFilter)
  changePassword(@Body() request: ChangePasswordRequest , @Token() token: string){

    request.jwtToke = this.tokenService.DecryptToken(token);
    return this.userService.changePassword(request);
  }


  @Post(USERS.ADDPERSONALINFORMATION)
  @UseGuards(PermissionsGuard)
  @HasOne(Permission.ADMIN, Permission.MANAGER)
  addPersonalInformation(@Body() request: AddPersonalInformationRequest , @Param("id") userId: number){
    
    request.userId = userId;
    return this.userDataService.addPersonalInformation(request);
  }

  @Post(USERS.ADDPMYERSONALINFORMATION)
  @UseGuards(PermissionsGuard)
  @HasOne(Permission.ADMIN, Permission.MANAGER, Permission.CONSULTANT)
  @UseFilters(UserAlreadyHavePersonalInfoExceptionFilter)
  addMyPersonalInformation(@Body() request: AddPersonalInformationRequest , @Token() token: string){
    
    request.userId = this.tokenService.DecryptToken(token).Id;
    return this.userDataService.addPersonalInformation(request);
  }

}
