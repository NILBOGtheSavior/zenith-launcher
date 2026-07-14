let cachedLocation = null;
let locationCachedAt = 0;
const LOCATION_CACHE_MS = 1000 * 60 * 60; // 1 hour

const WEATHER_CODES = {
  0: "Clear sky",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with heavy hail",
};

async function getLocation() {
  const now = Date.now();
  if (cachedLocation && now - locationCachedAt < LOCATION_CACHE_MS) {
    return cachedLocation;
  }

  const res = await fetch("http://ip-api.com/json/");
  const data = await res.json();

  if (data.status !== "success") {
    throw new Error("Failed to determine location from IP");
  }

  cachedLocation = {
    city: data.city,
    lat: data.lat,
    lon: data.lon,
  };
  locationCachedAt = now;

  return cachedLocation;
}

function dayLabel(dateStr, index) {
  if (index === 0) return "Today";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export async function getWeatherStatus() {
  const location = await getLocation();

  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${location.lat}&longitude=${location.lon}` +
    `&current=temperature_2m,weather_code` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
    `&timezone=auto`;

  const res = await fetch(url);
  const data = await res.json();

  const code = data.current.weather_code;

  const forecast = data.daily.time.slice(0, 5).map((date, i) => ({
    day: dayLabel(date, i),
    code: data.daily.weather_code[i],
    description: WEATHER_CODES[data.daily.weather_code[i]] ?? "Unknown",
    maxC: Math.round(data.daily.temperature_2m_max[i]),
    minC: Math.round(data.daily.temperature_2m_min[i]),
  }));

  return {
    city: location.city,
    tempC: Math.round(data.current.temperature_2m),
    description: WEATHER_CODES[code] ?? "Unknown",
    code,
    forecast,
  };
}
