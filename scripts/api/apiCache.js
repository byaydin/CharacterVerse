const _apiCache = new Map();

export function getCache(url) {
  return _apiCache.get(url);
}

export function hasCache(url) {
  return _apiCache.has(url);
}

export function setCache(url, value) {
  _apiCache.set(url, value);
}

export function deleteCache(url) {
  _apiCache.delete(url);
}
