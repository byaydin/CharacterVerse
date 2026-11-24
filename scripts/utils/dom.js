export function getElement(selector) {
  const element = document.querySelector(selector);

  if (!element) {
    console.log(`Element not found: ${selector}`);
    return null;
  }

  return element;
}

export function createElement(type, classes = "", content = "") {
  const element = document.createElement(type);

  if (classes !== "") {
    classes.split(" ").forEach((className) => {
      element.classList.add(className);
    });
  }

  if (content !== "") {
    element.textContent = content;
  }

  return element;
}
