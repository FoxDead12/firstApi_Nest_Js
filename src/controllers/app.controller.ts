import { Body, Controller, Get, HttpException, HttpStatus, Post, UseFilters, UseGuards } from '@nestjs/common';
import { USERS } from '../endpoints';
import { HasOne, PermissionsGuard } from '../guards/PermissionsGuard.guard';
import { UserAlreadyExisteExceptionFilter } from '../models/exceptions-filters/UserAlreadyExisteExceptionFilter';
import { UserNotFoundExceptionFilter } from '../models/exceptions-filters/UserNotFoundExceptionFilter';
import { Permission } from '../models/Permissions';
import { AuthRequest } from '../models/request/AuthRequest';
import { CreateNewUserRequest } from '../models/request/CreateNewUserRequest';
import { AppService } from '../services/app.service';
import { UserService } from '../services/user.service';
import { UserPermissionService } from '../services/userPermissions.service';

@Controller(USERS.BASE)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly userPermission: UserPermissionService,
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



}
