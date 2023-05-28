import express from "express";

const app = express();
app.use(express.json());

app.get("/api/users/currentuser", (req, res) => {
  res.send("Bye dog there!");
});

app.use("/api/users", (req, res) => {
  res.send("In the / route");
});

app.use("/", (req, res) => {
  res.send("In the / route");
});

app.listen(3000, () => {
  console.log("Dme?");
  console.log("List ening on port 3000");
});
