import { Router } from "express";
import * as wallpaperController from "../controllers/wallpaper.controller.js";

const router = Router();

router.get("/", wallpaperController.getAll);
router.get("/active", wallpaperController.getActive);
router.post(
  "/",
  wallpaperController.upload.single("image"),
  wallpaperController.create,
);
router.put("/:id/active", wallpaperController.toggle);
router.delete("/:id", wallpaperController.remove);

export default router;
