import { getElement } from "../utils/dom.js";

export const episodeElements = {
  filters: {
    name: getElement("#episode-name-filter"),
    episode: getElement("#episode-season-filter"),
  },
  container: getElement(".episode-grid"),
};
