import { createElement } from "../utils/dom.js";

export function renderPaginationNumbers(pagination, container) {
  container.innerHTML = "";

  pagination.getPageNumbers().forEach((number) => {
    const button = createElement("button", "page-number", number);

    if (pagination.currentPage === number) {
      button.classList.add("active");
      button.setAttribute("aria-current", "page");
    }

    button.addEventListener("click", () => {
      pagination.goToPage(number);
    });

    container.appendChild(button);
  });
}
