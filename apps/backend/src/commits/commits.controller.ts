import { Controller, Get, Query } from '@nestjs/common';
import { CommitsService } from './commits.service';

@Controller('commits')
export class CommitsController {
  constructor(private readonly appService: CommitsService) {}

  @Get()
  getCommits(@Query() query: { page: number }) {
    return this.appService.getCommits(query.page);
  }
}
