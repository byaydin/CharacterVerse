import { createElement } from "../utils/dom.js";

export function getErrorMessage(error) {
  const errorMessages = {
    400: "Invalid request. Please check your input.",
    401: "You are not authorized to access this resource.",
    403: "You don't have permission to access this resource.",
    404: "Couldn't find the requested data.",
    408: "The request timed out. Please try again.",
    429: "Too many requests. Please wait a moment and try again.",
    500: "Something went wrong on the server. Please try again later.",
    502: "Bad gateway. The server is temporarily unavailable.",
    503: "The service is currently unavailable. Please try again later.",
    504: "The server took too long to respond. Please try again.",
  };

  return errorMessages[error.status];
}

export function showErrorMessage(error, container, fallbackMessage) {
  const messageBox = createElement(
    "p",
    "message-box",
    getErrorMessage(error) || fallbackMessage,
  );

  container.replaceChildren(messageBox);
}
