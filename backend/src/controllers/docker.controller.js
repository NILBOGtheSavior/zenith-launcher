import * as dockerService from "../services/docker.service.js";

export async function getContainers(req, res) {
  try {
    const containers = await dockerService.listContainers();
    res.json({ ok: true, data: containers });
  } catch (err) {
    console.error("Failed to list containers:", err);
    res.status(500).json({ ok: false, error: "Failed to list containers" });
  }
}

export async function getAll(req, res) {
  try {
    const services = await dockerService.getServicesWithStatus();
    res.json({ ok: true, data: services });
  } catch (err) {
    console.error("Failed to get services:", err);
    res.status(500).json({ ok: false, error: "Failed to get services" });
  }
}

export function create(req, res) {
  const { containerName, name, url, icon } = req.body;
  if (!containerName || !name) {
    return res
      .status(400)
      .json({ ok: false, error: "containerName and name are required" });
  }
  const result = dockerService.addService(containerName, name, url, icon);
  res.status(201).json({ ok: true, data: result });
}

export function update(req, res) {
  const { id } = req.params;
  const { containerName, name, url, icon } = req.body;
  const result = dockerService.updateService(
    id,
    containerName,
    name,
    url,
    icon,
  );
  res.json({ ok: true, data: result });
}

export function remove(req, res) {
  const { id } = req.params;
  dockerService.deleteService(id);
  res.json({ ok: true });
}
