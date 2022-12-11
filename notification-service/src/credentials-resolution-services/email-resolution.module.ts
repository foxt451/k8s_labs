import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EmailResolutionService } from './email-resolution-service.service';

@Module({
  providers: [EmailResolutionService],
  imports: [HttpModule],
  exports: [EmailResolutionService],
})
export class EmailResolutionModule {}
