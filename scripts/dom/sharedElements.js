import { getElement } from "../utils/dom.js";

export const sharedElements = {
  searchCharacters: getElement("#search-characters"),
  resultCount: getElement(".results-count"),
};
