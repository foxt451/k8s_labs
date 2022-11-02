import express, { Request } from "express";
import morgan from "morgan";
import { authRouter } from "./routes/authRoutes.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
morgan.token("body", (req: Request) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);
app.use(express.json());
app.use("/", authRouter);

const main = () => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};

main();
