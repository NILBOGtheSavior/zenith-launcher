import { Router } from "express";
import * as settingsController from "../controllers/settings.controller.js";

const router = Router();
router.get("/:key", settingsController.get);
router.put("/:key", settingsController.set);
export default router;
