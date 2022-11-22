import express, { Request } from "express";
import { taskRouter } from "./routes/taskRoutes.js";
import morgan from "morgan";
import { testDelay } from "./controllers/testControllers.js";
import { testRouter } from "./routes/testRoutes.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
morgan.token("body", (req: Request) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);
app.use("/tasks", taskRouter);
app.use("/test", testRouter);

const main = () => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};

main();
