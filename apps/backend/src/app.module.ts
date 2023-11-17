import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommitsModule } from './commits/commits.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CommitsModule,
  ],
})
export class AppModule {}
