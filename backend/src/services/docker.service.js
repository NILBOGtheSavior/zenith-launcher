import db from "./db.service.js";
import Docker from "dockerode";

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

export async function listContainers() {
  const containers = await docker.listContainers({ all: false }); // only running ones
  return containers.map((c) => ({
    id: c.Id.substring(0, 12),
    name: c.Names[0]?.replace(/^\//, "") ?? "unknown",
    image: c.Image,
    state: c.State,
    status: c.Status,
    ports: c.Ports.map((p) => ({
      privatePort: p.PrivatePort,
      publicPort: p.PublicPort,
      type: p.Type,
    })),
  }));
}

export function getServices() {
  return db.prepare("SELECT * FROM services ORDER BY created_at DESC").all();
}

export function addService(containerName, name, url, icon = null) {
  return db
    .prepare(
      "INSERT INTO services (container_name, name, url, icon) VALUES (?, ?, ?, ?)",
    )
    .run(containerName, name, url, icon);
}

export function deleteService(id) {
  return db.prepare("DELETE FROM services WHERE id = ?").run(id);
}

export function updateService(id, containerName, name, url, icon) {
  return db
    .prepare(
      "UPDATE services SET container_name = ?, name = ?, url = ?, icon = ? WHERE id = ?",
    )
    .run(containerName, name, url, icon, id);
}

export async function getServicesWithStatus() {
  const services = getServices();
  const running = await listContainers();
  const runningNames = new Set(running.map((c) => c.name));

  return services.map((service) => ({
    ...service,
    status: runningNames.has(service.container_name) ? "running" : "stopped",
  }));
}
