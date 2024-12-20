import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from './mail/mail.module';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'maildb.sqlite',
  }),
  MailModule]
})
export class AppModule {}
