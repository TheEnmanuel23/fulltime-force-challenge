import { Module } from '@nestjs/common';
import { CommitsService } from './commits.service';
import { CommitsController } from './commits.controller';
import { GithubModule } from 'src/github/github.module';
import { GithubService } from 'src/github/github.service';
import { TrpcModule } from 'src/trpc/trpc.module';

@Module({
  imports: [GithubModule, TrpcModule],
  controllers: [CommitsController],
  providers: [GithubService, CommitsService],
})
export class CommitsModule {}
