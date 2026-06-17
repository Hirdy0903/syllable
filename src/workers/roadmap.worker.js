import { Worker } from "bullmq";

console.log("Starting worker...");

const worker = new Worker(
  "roadmap-generation",
  async (job) => {
    console.log("Processing:", job.data);
  },
  {
    connection: {
      url: process.env.REDIS_URL,
    },
  }
);

worker.on("ready", () => {
  console.log("Worker ready");
});

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("error", (err) => {
  console.error("Worker error:", err);
});