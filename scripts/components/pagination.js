export class Pagination {
  constructor(totalPages = 1, currentPage = 1, onPageChange = (page) => {}) {
    this.totalPages = Math.max(0, totalPages);
    this.currentPage = Math.max(1, Math.min(currentPage, this.totalPages));
    this.onPageChange = onPageChange;
  }

  getPageNumbers(pageCount = 5) {
    if (this.totalPages === 0) return [];

    let startPage;
    let endPage;

    if (this.totalPages <= pageCount) {
      startPage = 1;
      endPage = this.totalPages;
    } else {
      startPage = Math.max(1, this.currentPage - Math.floor(pageCount / 2));
      endPage = Math.min(this.totalPages, startPage + pageCount - 1);
      startPage = endPage - pageCount + 1;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index,
    );
  }

  goToPage(page) {
    if (
      !Number.isInteger(page) ||
      page < 1 ||
      page > this.totalPages ||
      page === this.currentPage
    ) {
      return;
    }

    this.currentPage = page;
    this.onPageChange(page);
  }

  updateTotalPages(totalPages) {
    this.totalPages = Math.max(0, totalPages);

    this.currentPage = Math.max(
      1,
      Math.min(this.currentPage, this.totalPages || 1),
    );
  }
}

export function initializePaginationControls(pagination, controlElements) {
  const controlsMap = {
    frst: () => 1,
    prev: () => pagination.currentPage - 1,
    next: () => pagination.currentPage + 1,
    last: () => pagination.totalPages,
  };

  Object.entries(controlsMap).forEach(([controlKey, getPage]) => {
    controlElements[controlKey].addEventListener("click", () => {
      pagination.goToPage(getPage());
    });
  });
}

export function updatePaginationControls(pagination, controlElements) {
  const isFrstPage = pagination.currentPage === 1;
  const isLastPage = pagination.currentPage === pagination.totalPages;

  controlElements.frst.disabled = isFrstPage;
  controlElements.last.disabled = isLastPage;

  controlElements.next.disabled = isLastPage;
  controlElements.prev.disabled = isFrstPage;
}
