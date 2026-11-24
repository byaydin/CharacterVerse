import { LocationCard } from "../components/LocationCard.js";

export function renderLocations(locations, container) {
  container.innerHTML = locations
    .map((location) => LocationCard(location))
    .join("");
}
