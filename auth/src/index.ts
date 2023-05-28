import express from "express";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express();
app.use(express.json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use("/", (req, res) => {
  res.send("No route hit");
});
app.get("/", (req, res) => {
  res.send("No route hit");
});
app.post("/", (req, res) => {
  res.send("No route hit");
});

app.listen(3000, () => {
  console.log("Updated again");
  console.log("List ening on port 3000");
});
