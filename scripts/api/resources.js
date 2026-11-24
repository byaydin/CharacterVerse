import { createApiUrl, fetchApiData } from "./apiClient.js";

export function getAllCharacters(filters = {}, page = 1) {
  return fetchApiData(createApiUrl("character/", filters, page));
}

export function getCharacterById(id) {
  return fetchApiData(createApiUrl(`character/${id}/`, {}, null));
}

export function getAllLocations(filters = {}, page = 1) {
  return fetchApiData(createApiUrl("location/", filters, page));
}

export function getLocationById(id) {
  return fetchApiData(createApiUrl(`location/${id}`, {}, null));
}

export function getAllEpisodes(filters = {}, page = 1) {
  return fetchApiData(createApiUrl("episode/", filters, page));
}

export function getEpisodeById(id) {
  return fetchApiData(createApiUrl(`episode/${id}`, {}, null));
}
