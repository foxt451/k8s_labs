import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import emailConfiguration, { emailConfigSchema } from './config/email.config';
import { SenderController } from './sender/sender.controller';
import { SenderService } from './sender/sender.service';
import kafkaConfiguration, { kafkaConfigSchema } from './config/kafka.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [emailConfiguration, kafkaConfiguration],
      validationSchema: emailConfigSchema.concat(kafkaConfigSchema),
      isGlobal: true,
    }),
  ],
  controllers: [SenderController],
  providers: [SenderService],
})
export class AppModule {}
