import {
  getFilters,
  initializeFilters,
  initializeResetFilter,
} from "../utils/filters.js";
import { showErrorMessage } from "../utils/errorMessages.js";
import { getAllEpisodes } from "../api/resources.js";
import { episodeElements } from "../dom/episodeElements.js";
import { filterElements } from "../dom/filterElements.js";
import { renderSkeletons } from "../render/renderSkeletons.js";
import { renderEpisodes } from "../render/renderEpisodes.js";
import { renderPaginationNumbers } from "../render/renderPagination.js";
import {
  Pagination,
  initializePaginationControls,
  updatePaginationControls,
} from "../components/pagination.js";
import { paginationElements } from "../dom/paginationElements.js";
import { renderResultCount } from "../render/renderResultCount.js";

const pagination = new Pagination(1, 1, loadEpisodes);

export async function loadEpisodes(page = 1) {
  try {
    // render skeleton loading cards
    renderSkeletons(episodeElements.container, 6);

    // get the current filters and fetch the data
    const filters = getFilters(episodeElements.filters);
    const episodes = await getAllEpisodes(filters, page);

    // update total pages, pagination controls and render pagination numbers
    pagination.updateTotalPages(episodes.info.pages);
    updatePaginationControls(pagination, paginationElements.controls);
    renderPaginationNumbers(pagination, paginationElements.pageNumbers);

    // render episodes and result count
    renderEpisodes(episodes.results, episodeElements.container);
    renderResultCount(episodes.results.length, "episodes");
  } catch (error) {
    showErrorMessage(
      error,
      episodeElements.container,
      "Failed to load episodes.",
    );
    renderResultCount(0, "episodes");
    console.error("Error loading episodes:", error);
  }
}

function initializeEpisodesPage() {
  initializePaginationControls(pagination, paginationElements.controls);

  initializeFilters(episodeElements.filters, () => {
    loadEpisodes(1);
  });

  initializeResetFilter(
    filterElements.resetFilters,
    episodeElements.filters,
    () => {
      loadEpisodes(1);
    },
  );

  loadEpisodes();
}

initializeEpisodesPage();
