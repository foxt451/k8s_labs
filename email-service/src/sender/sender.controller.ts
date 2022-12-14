import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { PRESET } from 'src/enums/presets';
import { SendEventPayload } from 'src/types/sender/SendEventPayload';
import { SenderService } from './sender.service';
import { config } from 'dotenv';

config();

@Controller('sender')
export class SenderController {
  private readonly logger = new Logger(SenderController.name);

  constructor(private senderService: SenderService) {}

  @EventPattern(process.env.KAFKA_TOPIC)
  async sendEmail<T extends PRESET>(payload: SendEventPayload<T>) {
    this.logger.log(`Preparing an email for: ${payload.receivers}`);
    await this.senderService.constructAndSendMail(payload);
  }
}
