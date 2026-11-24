import { BASE_PATH } from "../config";

const placeholder = `${BASE_PATH}images/placeholder-image.jpeg`;

export function handleImageLoading(img) {
  const imageContainer = img.parentElement;

  function imgLoaded() {
    imageContainer.classList.remove("loading");
  }

  function imgFailed() {
    imageContainer.classList.remove("loading");
    imageContainer.classList.add("image-error");
    img.src = placeholder;
  }

  img.addEventListener("load", imgLoaded);
  img.addEventListener("error", imgFailed);

  if (img.complete) {
    img.naturalWidth > 0 ? imgLoaded() : imgFailed();
  }
}
