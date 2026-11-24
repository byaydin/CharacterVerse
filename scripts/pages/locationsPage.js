import {
  getFilters,
  initializeFilters,
  initializeResetFilter,
} from "../utils/filters.js";
import { showErrorMessage } from "../utils/errorMessages.js";
import { locationElements } from "../dom/locationElements.js";
import { paginationElements } from "../dom/paginationElements.js";
import { filterElements } from "../dom/filterElements.js";
import { renderSkeletons } from "../render/renderSkeletons.js";
import { renderLocations } from "../render/renderLocations.js";
import { renderPaginationNumbers } from "../render/renderPagination.js";
import { renderResultCount } from "../render/renderResultCount.js";
import { getAllLocations } from "../api/resources.js";
import {
  Pagination,
  initializePaginationControls,
  updatePaginationControls,
} from "../components/pagination.js";

const pagination = new Pagination(1, 1, loadLocations);

export async function loadLocations(page = 1) {
  try {
    // render skeleton loading cards
    renderSkeletons(locationElements.container, 6);

    // get the current filters and fetch the data
    const filters = getFilters(locationElements.filters);
    const locations = await getAllLocations(filters, page);

    // update total pages, pagination controls and render pagination numbers
    pagination.updateTotalPages(locations.info.pages);
    updatePaginationControls(pagination, paginationElements.controls);
    renderPaginationNumbers(pagination, paginationElements.pageNumbers);

    // render locations and result count
    renderLocations(locations.results, locationElements.container);
    renderResultCount(locations.results.length, "locations");
  } catch (error) {
    showErrorMessage(
      error,
      locationElements.container,
      "Failed to load locations.",
    );
    renderResultCount(0, "locations");
    console.error("Error loading locations:", error);
  }
}

function initializeLocationsPage() {
  initializePaginationControls(pagination, paginationElements.controls);

  initializeFilters(locationElements.filters, () => {
    loadLocations(1);
  });

  initializeResetFilter(
    filterElements.resetFilters,
    locationElements.filters,
    () => {
      loadLocations(1);
    },
  );

  loadLocations();
}

initializeLocationsPage();
