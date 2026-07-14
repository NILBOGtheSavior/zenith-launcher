import { Router } from "express";
import { getStatus } from "../controllers/weather.controller.js";

const router = Router();
router.get("/status", getStatus);
export default router;
