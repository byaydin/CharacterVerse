import { BASE_PATH } from "../config.js";
import { extractSeason } from "../utils/episode.js";



export function EpisodeCard(episode) {
  return `
    <article class="info-card">
      <a href="${BASE_PATH}pages/episode.html?id=${episode.id}" class="info-card-link">
        <div class="info-card-header">
          <span class="info-card-label">${episode.episode}</span>
          <span class="info-card-meta">SEASON ${extractSeason(episode)}</span>
        </div>

        <div class="info-card-content">
          <h3>${episode.name}</h3>
          <p><span>Air date:</span>${episode.air_date}</p>
        </div>

        <div class="info-card-footer">
          <span class="info-card-details">${episode.characters.length} characters</span>
          <button class="info-card-btn">View Details</button>
        </div>
      </a>
    </article>
  `;
}
