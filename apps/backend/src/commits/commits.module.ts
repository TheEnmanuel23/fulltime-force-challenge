import { Module } from '@nestjs/common';
import { CommitsService } from './commits.service';
import { CommitsController } from './commits.controller';
import { GithubModule } from 'src/github/github.module';
import { GithubService } from 'src/github/github.service';

@Module({
  imports: [GithubModule],
  controllers: [CommitsController],
  providers: [GithubService, CommitsService],
  exports: [GithubService],
})
export class CommitsModule {}
