import db from "./db.service.js";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const WALLPAPER_DIR = join(__dirname, "../../data/wallpapers");

export async function ensureWallpaperDir() {
  await fs.mkdir(WALLPAPER_DIR, { recursive: true });
}

export function getWallpapers() {
  return db.prepare("SELECT * FROM wallpapers ORDER BY created_at DESC").all();
}

export function getActiveWallpapers() {
  return db
    .prepare(
      "SELECT * FROM wallpapers WHERE active = 1 ORDER BY created_at DESC",
    )
    .all();
}

export function addWallpaper(filename) {
  return db
    .prepare("INSERT INTO wallpapers (filename) VALUES (?)")
    .run(filename);
}

export function setActive(id, active) {
  return db
    .prepare("UPDATE wallpapers SET active = ? WHERE id = ?")
    .run(active ? 1 : 0, id);
}

export async function deleteWallpaper(id) {
  const wallpaper = db.prepare("SELECT * FROM wallpapers WHERE id = ?").get(id);

  if (wallpaper) {
    try {
      await fs.unlink(join(WALLPAPER_DIR, wallpaper.filename));
    } catch (err) {
      console.error("Failed to delete wallpaper file:", err.message);
    }
  }

  return db.prepare("DELETE FROM wallpapers WHERE id = ?").run(id);
}
