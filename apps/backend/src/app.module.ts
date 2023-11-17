import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommitsModule } from './commits/commits.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CommitsModule,
  ],
})
export class AppModule {}
