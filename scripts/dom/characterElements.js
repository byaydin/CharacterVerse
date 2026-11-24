import { getElement } from "../utils/dom.js";

export const characterElements = {
  filters: {
    status: getElement("#character-status-filter"),
    gender: getElement("#character-gender-filter"),
    species: getElement("#character-species-filter"),
  },
  container: getElement(".character-grid"),
};
