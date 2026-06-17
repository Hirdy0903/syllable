import { Queue } from "bullmq";

export const roadmapQueue = new Queue(
  "roadmap-generation",
  {
    connection: {
      url: process.env.REDIS_URL,
    },
  }
);