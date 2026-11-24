import { EpisodeCard } from "../components/EpisodeCard.js";

export function renderEpisodes(episodes, container) {
  container.innerHTML = episodes
    .map((episode) => EpisodeCard(episode))
    .join("");
}
