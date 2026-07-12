const SUGGEST_URLS = {
  google: (q) =>
    `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(q)}`,
  duckduckgo: (q) =>
    `https://duckduckgo.com/ac/?q=${encodeURIComponent(q)}&type=list`,
  bing: (q) =>
    `https://api.bing.com/osjson.aspx?query=${encodeURIComponent(q)}`,
};

const SEARCH_URLS = {
  google: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  duckduckgo: (q) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
  bing: (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
};

export async function getSuggestions(engine, query) {
  const buildUrl = SUGGEST_URLS[engine] ?? SUGGEST_URLS.google;
  const res = await fetch(buildUrl(query));
  const data = await res.json();
  return data[1];
}

export function getSearchUrl(engine, query) {
  const buildUrl = SEARCH_URLS[engine] ?? SEARCH_URLS.google;
  return buildUrl(query);
}
