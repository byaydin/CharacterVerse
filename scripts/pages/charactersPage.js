import {
  getFilters,
  initializeFilters,
  initializeResetFilter,
} from "../utils/filters.js";
import { handleImageLoading } from "../utils/imageLoader.js";
import { showErrorMessage } from "../utils/errorMessages.js";
import { characterElements } from "../dom/characterElements.js";
import { paginationElements } from "../dom/paginationElements.js";
import { sharedElements } from "../dom/sharedElements.js";
import { filterElements } from "../dom/filterElements.js";
import { renderSkeletons } from "../render/renderSkeletons.js";
import { renderCharacters } from "../render/renderCharacters.js";
import { renderPaginationNumbers } from "../render/renderPagination.js";
import { renderResultCount } from "../render/renderResultCount.js";
import { getAllCharacters } from "../api/resources.js";
import {
  Pagination,
  initializePaginationControls,
  updatePaginationControls,
} from "../components/pagination.js";
import { debounce } from "../utils/debounce.js";

const pagination = new Pagination(1, 1, loadCharacters);
const searchDelay = 500;

export async function loadCharacters(page = 1) {
  try {
    // render skeleton loading cards
    renderSkeletons(characterElements.container, 10);

    // get the current filters and fetch the data
    const filters = getFilters(characterElements.filters);
    filters.name = sharedElements.searchCharacters.value;
    const characters = await getAllCharacters(filters, page);

    // update total pages, pagination controls and render pagination numbers
    pagination.updateTotalPages(characters.info.pages);
    updatePaginationControls(pagination, paginationElements.controls);
    renderPaginationNumbers(pagination, paginationElements.pageNumbers);

    // render characters and result count
    renderCharacters(characters.results, characterElements.container);
    renderResultCount(characters.results.length, "characters");

    // handle image loading for each card image
    characterElements.container
      .querySelectorAll(".card-image img")
      .forEach(handleImageLoading);
  } catch (error) {
    showErrorMessage(
      error,
      characterElements.container,
      "Failed to load characters.",
    );
    renderResultCount(0, "characters");
    console.error("Error loading characters:", error);
  }
}

function initializeSearchCharacters() {
  sharedElements.searchCharacters.addEventListener(
    "input",
    debounce(() => {
      loadCharacters(1);
    }, searchDelay),
  );
}

function initializeCharactersPage() {
  initializeSearchCharacters();
  initializePaginationControls(pagination, paginationElements.controls);

  initializeFilters(characterElements.filters, () => {
    loadCharacters(1);
  });

  initializeResetFilter(
    filterElements.resetFilters,
    characterElements.filters,
    () => {
      loadCharacters(1);
    },
  );

  loadCharacters();
}

initializeCharactersPage();
