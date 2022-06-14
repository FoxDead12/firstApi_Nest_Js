import { Body, Controller, Get, HttpException, HttpStatus, Post, UseFilters } from '@nestjs/common';
import { USERS } from '../endpoints';
import { UserAlreadyExisteExceptionFilter } from '../models/exceptions-filters/UserAlreadyExisteExceptionFilter';
import { CreateNewUserRequest } from '../models/request/CreateNewUserRequest';
import { AppService } from '../services/app.service';
import { UserService } from '../services/user.service';

@Controller(USERS.BASE)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService
  ) {}


  @Post()
  @UseFilters(new UserAlreadyExisteExceptionFilter())
  createNewUser(@Body() request: CreateNewUserRequest){
    return this.userService.createNewUser(request);
  }

  @Get(USERS.CREATEROOTUSER)
  getHello(): string {
    return this.appService.getHello();
  }


}
