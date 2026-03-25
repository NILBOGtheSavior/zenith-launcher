import express from "express";
const app = express();
export default app;

app.get("/api/hello", (req, res) => {
  res.send("Hello world!");
});
