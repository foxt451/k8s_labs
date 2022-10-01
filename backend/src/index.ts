import express from "express";
import { taskRouter } from "./routes/taskRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use("/tasks", taskRouter);

const main = () => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};

main();
