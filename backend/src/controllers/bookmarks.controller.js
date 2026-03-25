import * as bookmarksService from "../services/bookmarks.service.js";

export function getAll(req, res) {
  const bookmarks = bookmarksService.getBookmarks();
  res.json({ ok: true, data: bookmarks });
}

export function create(req, res) {
  const { url, title, tags } = req.body;
  if (!url)
    return res.status(400).json({ ok: false, error: "URL is required" });
  const result = bookmarksService.addBookmark(url, title, tags);
  res.status(201).json({ ok: true, data: result });
}

export function update(req, res) {
  const { id } = req.params;
  const { url, title, tags } = req.body;
  const result = bookmarksService.updateBookmark(id, url, title, tags);
  res.json({ ok: true, data: result });
}

export function remove(req, res) {
  const { id } = req.params;
  bookmarksService.deleteBookmark(id);
  res.json({ ok: true });
}
