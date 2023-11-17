import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvidersModule } from './providers/providers.module';
import { HttpCustomService } from './providers/http/http.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProvidersModule,
  ],
  controllers: [AppController],
  providers: [HttpCustomService, AppService],
})
export class AppModule {}
