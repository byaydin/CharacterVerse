import { getElement } from "../utils/dom.js";

export const characterDetailsElements = {
  breadcrumb: {
    characterName: getElement(".breadcrumb .js-character-name"),
  },

  characterProfile: {
    image: getElement(".js-character-image"),
    status: getElement(".js-character-status"),
    statusText: getElement(".js-status-text"),
    label: getElement(".js-character-label"),
    name: getElement(".detail-view-heading .js-character-name"),
    subtitle: getElement(".js-character-subtitle"),
    species: getElement(".js-character-species"),
    gender: getElement(".js-character-gender"),
    origin: getElement(".js-character-origin"),
    location: getElement(".js-character-location"),
    type: getElement(".js-character-type"),
    created: getElement(".js-character-created"),
  },

  characterEpisodes: {
    sectionDescription: getElement(".character-episodes .section-description"),
    episodeCount: getElement(".js-episode-count"),
    episodeGrid: getElement(".js-character-episode-grid"),
  },
};
