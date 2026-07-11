import express from "express";
import "./services/db.service.js";
import bookmarkRoutes from "./routes/bookmarks.routes.js";
import dockerRoutes from "./routes/docker.routes.js";
import systemRoutes from "./routes/system.routes.js";

const app = express();
app.use(express.json());
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/docker", dockerRoutes);
app.use("/api/system", systemRoutes);
export default app;
