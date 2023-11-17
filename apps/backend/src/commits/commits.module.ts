import { Module } from '@nestjs/common';
import { CommitsService } from './commits.service';
import { ProvidersModule } from 'src/providers/providers.module';
import { HttpCustomService } from 'src/providers/http/http.service';
import { CommitsController } from './commits.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, ProvidersModule],
  controllers: [CommitsController],
  providers: [HttpCustomService, CommitsService],
})
export class CommitsModule {}
