import { Router } from "express";
import * as dockerController from "../controllers/docker.controller.js";

const router = Router();
router.get("/containers", dockerController.getContainers);
router.get("/services", dockerController.getAll);
router.post("/services", dockerController.create);
router.put("/services/:id", dockerController.update);
router.delete("/services/:id", dockerController.remove);

export default router;
