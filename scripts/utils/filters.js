import { debounce } from "./debounce.js";

export function getFilters(filterElements) {
  return Object.fromEntries(
    Object.entries(filterElements)
      .filter(([_, element]) => element.value !== "")
      .map(([key, element]) => [key, element.value]),
  );
}

export function resetFilters(filterElements) {
  Object.values(filterElements).forEach((element) => {
    element.value = "";
  });
}

export function initializeResetFilter(
  resetFilterElement,
  filterElements,
  onFilterChange,
) {
  if (resetFilterElement) {
    resetFilterElement.addEventListener("click", () => {
      resetFilters(filterElements);
      onFilterChange();
    });
  }
}

export function getFilterEvent(element) {
  const eventMap = {
    INPUT: "input",
    SELECT: "change",
  };

  return eventMap[element.tagName] || "change";
}

export function initializeFilters(filterElements, onFilterChange) {
  Object.values(filterElements).forEach((element) => {
    const debouncedOnFilterChange = debounce(onFilterChange, 600);
    const filterEvent = getFilterEvent(element);
    element.addEventListener(
      filterEvent,
      filterEvent === "input" ? debouncedOnFilterChange : onFilterChange,
    );
  });
}
