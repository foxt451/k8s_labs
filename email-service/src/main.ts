import { ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import kafkaConfiguration from './config/kafka.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const kafkaConfig = app.get<ConfigType<typeof kafkaConfiguration>>(
    kafkaConfiguration.KEY,
  );
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'email-service',
        brokers: [kafkaConfig.brokerUrl],
      },
      consumer: {
        groupId: 'email-service',
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
