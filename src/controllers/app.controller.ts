import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/services/app.service';
import { USERS } from 'src/endpoints';

@Controller(USERS.BASE)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(USERS.CREATEROOTUSER)
  getHello(): string {
    return this.appService.getHello();
  }


}
