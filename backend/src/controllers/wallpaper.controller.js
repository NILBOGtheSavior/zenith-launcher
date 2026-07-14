import multer from "multer";
import { randomUUID } from "crypto";
import { extname } from "path";
import * as wallpaperService from "../services/wallpaper.service.js";

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    await wallpaperService.ensureWallpaperDir();
    cb(null, wallpaperService.WALLPAPER_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${randomUUID()}${extname(file.originalname)}`);
  },
});

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, and WebP images are allowed"));
    }
  },
});

export function getAll(req, res) {
  const wallpapers = wallpaperService.getWallpapers();
  res.json({ ok: true, data: wallpapers });
}

export function getActive(req, res) {
  const wallpapers = wallpaperService.getActiveWallpapers();
  res.json({ ok: true, data: wallpapers });
}

export function create(req, res) {
  if (!req.file) {
    return res.status(400).json({ ok: false, error: "No file uploaded" });
  }
  const result = wallpaperService.addWallpaper(req.file.filename);
  res.status(201).json({ ok: true, data: result });
}

export function toggle(req, res) {
  const { id } = req.params;
  const { active } = req.body;
  wallpaperService.setActive(id, active);
  res.json({ ok: true });
}

export async function remove(req, res) {
  const { id } = req.params;
  await wallpaperService.deleteWallpaper(id);
  res.json({ ok: true });
}
