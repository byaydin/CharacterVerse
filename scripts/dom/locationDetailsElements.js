import { getElement } from "../utils/dom.js";

export const locationDetailsElements = {
  breadcrumb: {
    locationName: getElement(".breadcrumb .js-location-name"),
  },

  locationProfile: {
    names: document.querySelectorAll(".js-location-name"),
    types: document.querySelectorAll(".js-location-type"),
    label: getElement(".js-location-label"),
    subtitle: getElement(".js-location-subtitle"),
    dimension: getElement(".js-location-dimension"),
    residentCount: document.querySelectorAll(".js-location-resident-count"),
    id: getElement(".js-location-id"),
    created: getElement(".js-location-created"),
  },

  locationResidents: {
    residentCount: document.querySelectorAll(".js-location-resident-count"),
    residentGrid: getElement(".js-location-resident-grid"),
  },
};
