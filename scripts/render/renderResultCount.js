import { sharedElements } from "../dom/sharedElements.js";

export function renderResultCount(count, contentType) {
  sharedElements.resultCount.innerHTML = `showing ${count} ${contentType}`;
}
