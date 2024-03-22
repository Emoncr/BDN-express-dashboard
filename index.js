import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
