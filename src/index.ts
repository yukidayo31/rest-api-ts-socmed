import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import userRoute from "./router/userRoute";
import authRoute from "./router/authRoute";
import postRoute from "./router/postRoute";

const app: Express = express();
const port: number = 3000;

app.use(bodyParser.json());

app.use("/api/users", userRoute);

app.use("/api/auth", authRoute);

app.use("/api/posts", postRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("This is main page!");
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
