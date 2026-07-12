import express from "express";
import "./services/db.service.js";
import bookmarkRoutes from "./routes/bookmarks.routes.js";
import dockerRoutes from "./routes/docker.routes.js";
import systemRoutes from "./routes/system.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import searchRoutes from "./routes/search.routes.js";
const app = express();

app.use(express.json());
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/docker", dockerRoutes);
app.use("/api/system", systemRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/search", searchRoutes);

export default app;
