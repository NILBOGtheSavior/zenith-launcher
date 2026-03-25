import express from "express";
import "./services/db.service.js";
import bookmarkRoutes from "./routes/bookmarks.routes.js";

const app = express();
app.use(express.json());
app.use("/api/bookmarks", bookmarkRoutes);
export default app;

app.get("/api/hello", (req, res) => {
  res.send("Hello world!");
});
