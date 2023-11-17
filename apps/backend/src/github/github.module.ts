import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProvidersModule } from 'src/providers/providers.module';
import { HttpCustomService } from 'src/providers/http/http.service';
import { GithubService } from './github.service';

@Module({
  imports: [ConfigModule, ProvidersModule],
  providers: [HttpCustomService, GithubService],
})
export class GithubModule {}
