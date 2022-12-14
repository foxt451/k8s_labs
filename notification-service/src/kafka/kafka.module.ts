import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import kafkaConfiguration from 'src/config/kafka.config';

@Module({
  providers: [
    {
      provide: 'KAFKA_CLIENT',
      useFactory: (kafkaConfig: ConfigType<typeof kafkaConfiguration>) => {
        return ClientProxyFactory.create({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'notification-service',
              brokers: [kafkaConfig.brokerUrl],
            },
            consumer: {
              groupId: 'notification-service',
            },
          },
        });
      },
      inject: [kafkaConfiguration.KEY],
    },
  ],
  exports: ['KAFKA_CLIENT'],
})
export class KafkaModule {}
