import { kafkaProducer } from "../kafka/kafka.js";
import { TaskTopicItem } from "../types/tasks/TaskTopicItem.js";

const taskQueueTopic = process.env.TASK_QUEUE_TOPIC || "task-updates";

class BrokerService {
  public async emit<T>(data: T, topic: string) {
    await kafkaProducer.send({
      messages: [
        {
          value: JSON.stringify(data),
        },
      ],
      topic,
    });
  }

  public async emitTaskUpdate(data: TaskTopicItem) {
    await this.emit<TaskTopicItem>(data, taskQueueTopic);
  }
}

export const brokerService = new BrokerService();
