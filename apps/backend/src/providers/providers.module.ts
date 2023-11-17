import { Global, Module } from '@nestjs/common';
import { HttpCustomService } from './http/http.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [HttpModule, ConfigModule],
  providers: [HttpCustomService],
  exports: [HttpModule, HttpCustomService],
})
export class ProvidersModule {}
