import { baseApiUrl, apiCacheTime } from "./apiConfig.js";

import { getCache, hasCache, setCache, deleteCache } from "./apiCache.js";

export function createApiUrl(endpoint, filters = {}, page = 1) {
  const url = new URL(endpoint, baseApiUrl);

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.set(key, value);
    }
  });

  if (page !== null && page !== undefined) {
    url.searchParams.set("page", page);
  }

  return url.href;
}

export function fetchApiData(url) {
  if (hasCache(url)) {
    const cachedData = getCache(url);

    if (cachedData.promise) {
      console.log("Request in progress:", url);
      return cachedData.promise;
    }

    if (Date.now() < cachedData.expiresAt) {
      console.log("Cache hit:", url);
      return cachedData.data;
    }

    deleteCache(url);
  }

  console.log("Cache miss:", url);
  console.log("Fetching:", url);

  const promise = fetch(url)
    .then((response) => {
      if (!response.ok) {
        const error = new Error(`HTTP Error: ${response.status}`);
        error.status = response.status;

        throw error;
      }

      return response.json();
    })
    .then((data) => {
      setCache(url, {
        data,
        expiresAt: Date.now() + apiCacheTime,
      });

      console.log("Fetch completed:", url);

      return data;
    })
    .catch((error) => {
      deleteCache(url);
      throw error;
    });

  setCache(url, { promise });

  return promise;
}
