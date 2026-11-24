import { getElement } from "../utils/dom.js";

export const paginationElements = {
  controls: {
    frst: getElement(".page-button.first"),
    prev: getElement(".page-button.prev"),
    next: getElement(".page-button.next"),
    last: getElement(".page-button.last"),
  },

  pageNumbers: getElement(".pagination-numbers"),
};
