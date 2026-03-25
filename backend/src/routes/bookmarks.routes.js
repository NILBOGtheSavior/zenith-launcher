import { Router } from "express";
import * as bookmarksController from "../controllers/bookmarks.controller.js";

const router = Router();

router.get("/", bookmarksController.getAll);
router.post("/", bookmarksController.create);
router.patch("/:id", bookmarksController.update);
router.delete("/:id", bookmarksController.remove);

export default router;
