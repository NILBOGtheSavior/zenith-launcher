import { getSystemStatus } from "../services/system.service.js";

export async function getStatus(req, res) {
  try {
    const status = await getSystemStatus();
    res.json({ ok: true, data: status });
  } catch (err) {
    console.error("Failed to get system status:", err);
    res.status(500).json({ ok: false, error: "Failed to get system status" });
  }
}
