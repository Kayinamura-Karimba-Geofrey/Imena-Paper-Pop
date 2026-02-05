import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { InvitationModule } from './invitation/invitation.module.js';

@Module({
  imports: [InvitationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
