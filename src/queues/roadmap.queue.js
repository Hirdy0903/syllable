import { Queue } from "bullmq";

export const roadmapQueue = new Queue(
  "roadmap-generation",
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
);