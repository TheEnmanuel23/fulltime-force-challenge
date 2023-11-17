import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcRouter } from './trpc.router';
import { CommitsService } from 'src/commits/commits.service';
import { CommitsModule } from 'src/commits/commits.module';

@Module({
  imports: [CommitsModule],
  providers: [TrpcService, TrpcRouter, CommitsService],
})
export class TrpcModule {}
