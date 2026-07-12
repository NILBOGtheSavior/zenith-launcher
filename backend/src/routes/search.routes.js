import { Router } from "express";
import { suggest } from "../controllers/search.controller.js";

const router = Router();
router.get("/suggest", suggest);
export default router;
