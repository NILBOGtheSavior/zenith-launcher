import * as searchService from "../services/search.service.js";
import { getSetting } from "../services/settings.service.js";

export async function suggest(req, res) {
  const q = req.query.q;
  if (!q) return res.json({ ok: true, data: [] });

  const engine = getSetting("search_engine", "google");

  try {
    const suggestions = await searchService.getSuggestions(engine, q);
    res.json({ ok: true, data: suggestions });
  } catch (err) {
    console.error("Failed to fetch suggestions:", err);
    res.status(500).json({ ok: false, error: "Failed to fetch suggestions" });
  }
}
