import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/commits')
  getCommits(@Query() query: { page: number }) {
    return this.appService.getCommits(query.page);
  }
}
