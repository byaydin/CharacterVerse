import { statisticsElements } from "../../dom/statisticsElements.js";

import {
  getAllCharacters,
  getAllLocations,
  getAllEpisodes,
} from "../../api/resources.js";

async function initializeStatistics() {
  try {
    const [allCharacters, allLocations, allEpisodes, aliveCharacters] =
      await Promise.all([
        getAllCharacters(),
        getAllLocations(),
        getAllEpisodes(),
        getAllCharacters({ status: "alive" }),
      ]);

    statisticsElements.characters.textContent = allCharacters.info.count;
    statisticsElements.locations.textContent = allLocations.info.count;
    statisticsElements.episodes.textContent = allEpisodes.info.count;
    statisticsElements.aliveCharacters.textContent = aliveCharacters.info.count;
  } catch (error) {
    console.error("Error loading statistics:", error);
  }
}

initializeStatistics();
