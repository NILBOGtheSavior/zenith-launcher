import db from "./db.service.js";

export function getBookmarks() {
  return db.prepare("SELECT * FROM bookmarks ORDER BY created_at DESC").all();
}

export function addBookmark(url, title, tags = []) {
  return db
    .prepare("INSERT INTO bookmarks (url, title, tags) VALUES (?, ?, ?)")
    .run(url, title, JSON.stringify(tags));
}

export function deleteBookmark(id) {
  return db.prepare("DELETE FROM bookmarks WHERE id = ?").run(id);
}

export function updateBookmark(id, url, title, tags) {
  return db
    .prepare("UPDATE bookmarks SET url = ?, title = ?, tags = ? WHERE id = ?")
    .run(url, title, JSON.stringify(tags), id);
}
