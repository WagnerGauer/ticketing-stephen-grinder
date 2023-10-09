import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@wagtickets/common";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.all("*", (req, res) => {
  console.log("this route does not exist in the server");
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };