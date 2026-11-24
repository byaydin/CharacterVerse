import { getElement } from "../utils/dom.js";

export const locationElements = {
  filters: {
    name: getElement("#location-name-filter"),
    type: getElement("#location-type-filter"),
    dimension: getElement("#location-dimension-filter"),
  },
  container: getElement(".location-grid"),
};
