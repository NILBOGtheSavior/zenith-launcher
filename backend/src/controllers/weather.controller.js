import { getWeatherStatus } from "../services/weather.service.js";

export async function getStatus(req, res) {
  try {
    const weather = await getWeatherStatus();
    res.json({ ok: true, data: weather });
  } catch (err) {
    console.error("Failed to get weather:", err);
    res.status(500).json({ ok: false, error: "Failed to get weather" });
  }
}
