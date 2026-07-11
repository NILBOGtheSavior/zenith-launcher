import express from "express";
import "./services/db.service.js";
import bookmarkRoutes from "./routes/bookmarks.routes.js";
import dockerRoutes from "./routes/docker.routes.js";

const app = express();
app.use(express.json());
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/docker", dockerRoutes);
export default app;

app.get("/api/hello", (req, res) => {
  res.send("Hello world!");
});
