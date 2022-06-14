import { Controller, Get } from '@nestjs/common';
import { USERS } from '../endpoints';
import { AppService } from '../services/app.service';

@Controller(USERS.BASE)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(USERS.CREATEROOTUSER)
  getHello(): string {
    return this.appService.getHello();
  }


}
