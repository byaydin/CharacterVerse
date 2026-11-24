import { SkeletonCard } from "../components/SkeletonCard.js";

export function renderSkeletons(container, length) {
  container.innerHTML = Array.from({ length }, () => SkeletonCard()).join("");
}
