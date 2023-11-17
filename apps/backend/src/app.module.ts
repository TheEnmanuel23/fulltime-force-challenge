import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommitsModule } from './commits/commits.module';
import configuration from './config/configuration';
import { TrpcModule } from './trpc/trpc.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TrpcModule,
    CommitsModule,
  ],
})
export class AppModule {}
