import fs from "fs/promises";

const HOST_PROC = "/host/proc";
const HOST_SYS = "/host/sys";

async function readCpuTimes() {
  const stat = await fs.readFile(`${HOST_PROC}/stat`, "utf8");
  const line = stat.split("\n")[0];
  const parts = line.trim().split(/\s+/).slice(1).map(Number);
  const [user, nice, system, idle, iowait, irq, softirq, steal] = parts;
  const total = user + nice + system + idle + iowait + irq + softirq + steal;
  return { idle: idle + iowait, total };
}

export async function getCpuUsage() {
  const first = await readCpuTimes();
  await new Promise((resolve) => setTimeout(resolve, 200));
  const second = await readCpuTimes();

  const idleDelta = second.idle - first.idle;
  const totalDelta = second.total - first.total;
  const usage = totalDelta === 0 ? 0 : 1 - idleDelta / totalDelta;

  return Math.round(usage * 100);
}

export async function getMemoryUsage() {
  const meminfo = await fs.readFile(`${HOST_PROC}/meminfo`, "utf8");
  const lines = meminfo.split("\n");

  const getValue = (key) => {
    const line = lines.find((l) => l.startsWith(key));
    if (!line) return 0;
    return parseInt(line.split(/\s+/)[1], 10);
  };

  const totalKb = getValue("MemTotal:");
  const availableKb = getValue("MemAvailable:");
  const usedKb = totalKb - availableKb;

  return {
    totalMb: Math.round(totalKb / 1024),
    usedMb: Math.round(usedKb / 1024),
    percent: totalKb === 0 ? 0 : Math.round((usedKb / totalKb) * 100),
  };
}

export async function getCpuTemperature() {
  const thermalDir = `${HOST_SYS}/class/thermal`;

  let zones;
  try {
    zones = await fs.readdir(thermalDir);
  } catch {
    return null;
  }

  const zoneDirs = zones.filter((z) => z.startsWith("thermal_zone"));
  if (zoneDirs.length === 0) return null;

  const candidates = [];

  for (const zone of zoneDirs) {
    try {
      const type = (
        await fs.readFile(`${thermalDir}/${zone}/type`, "utf8")
      ).trim();
      const tempRaw = (
        await fs.readFile(`${thermalDir}/${zone}/temp`, "utf8")
      ).trim();
      const tempC = parseInt(tempRaw, 10) / 1000;
      candidates.push({ type, tempC });
    } catch {}
  }

  if (candidates.length === 0) return null;

  const preferred = candidates.find((c) => /cpu|pkg|soc/i.test(c.type));

  return Math.round((preferred ?? candidates[0]).tempC);
}

export async function getSystemStatus() {
  const [cpu, memory, temperature] = await Promise.all([
    getCpuUsage(),
    getMemoryUsage(),
    getCpuTemperature(),
  ]);

  return { cpu, memory, temperature };
}
