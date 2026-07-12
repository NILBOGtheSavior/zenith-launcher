import * as settingsService from "../services/settings.service.js";

export function get(req, res) {
  const { key } = req.params;
  const value = settingsService.getSetting(key);
  res.json({ ok: true, data: { key, value } });
}

export function set(req, res) {
  const { key } = req.params;
  const { value } = req.body;
  settingsService.setSetting(key, value);
  res.json({ ok: true, data: { key, value } });
}
