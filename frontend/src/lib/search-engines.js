import { apiFetch } from "$lib/api.js";
import { searchEngine } from "$lib/stores.js";
import { get } from "svelte/store";

export const ENGINES = [
  { id: "google", label: "Google" },
  { id: "duckduckgo", label: "DuckDuckGo" },
  { id: "bing", label: "Bing" },
];

export const SEARCH_URLS = {
  google: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  duckduckgo: (q) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
  bing: (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
};

export async function loadSearchEngine() {
  try {
    const { data } = await apiFetch("/settings/search_engine");
    if (data.value) searchEngine.set(data.value);
  } catch (err) {
    console.error("Failed to load search engine setting:", err);
  }
}

export async function saveSearchEngine(id) {
  searchEngine.set(id);
  try {
    await apiFetch("/settings/search_engine", {
      method: "PUT",
      body: JSON.stringify({ value: id }),
    });
  } catch (err) {
    console.error("Failed to save search engine setting:", err);
  }
}
