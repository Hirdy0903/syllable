import express from "express";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Syllable API Running");
});
app.use("/api/v1", routes);
app.use(errorHandler);

export default app;