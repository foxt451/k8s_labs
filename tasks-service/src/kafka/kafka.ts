import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "tasks-service",
  brokers: [process.env.BROKER_URL || "http://localhost:9092"],
});

export const kafkaProducer = kafka.producer();

await kafkaProducer.connect();

const errorTypes = ["unhandledRejection", "uncaughtException"];
const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

errorTypes.forEach((type) => {
  process.on(type, async (e) => {
    try {
      console.log(`process.on ${type}`);
      console.error(e);
      await kafkaProducer.disconnect();
      process.exit(0);
    } catch (_) {
      process.exit(1);
    }
  });
});

signalTraps.forEach((type) => {
  process.once(type, async () => {
    try {
      await kafkaProducer.disconnect();
    } finally {
      process.kill(process.pid, type);
    }
  });
});
