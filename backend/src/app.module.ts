import { Module } from '@nestjs/common';
import { GithubModule } from './github/github.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load:[configuration]
    }),

    GithubModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
