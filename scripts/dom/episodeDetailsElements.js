import { getElement } from "../utils/dom.js";

export const episodeDetailsElements = {
  breadcrumb: {
    episodeName: getElement(".breadcrumb .js-episode-name"),
  },

  episodeProfile: {
    codes: document.querySelectorAll(".js-episode-code"),
    names: document.querySelectorAll(".js-episode-name"),
    label: getElement(".js-episode-label"),
    subtitle: getElement(".js-episode-subtitle"),
    description: getElement(".js-episode-description"),
    season: getElement(".js-episode-season"),
    number: getElement(".js-episode-number"),
    airDate: getElement(".js-episode-air-date"),
    id: getElement(".js-episode-id"),
    created: getElement(".js-episode-created"),
  },

  episodeCharacters: {
    characterCount: getElement(".js-character-count"),
    characterGrid: getElement(".js-episode-character-grid"),
  },
};
