import { BASE_PATH } from "../config.js";

export function CharacterCard(character) {
  return `
    <article class="character-card">
      <a class="character-link" href="${BASE_PATH}pages/character.html?id=${character.id}">
        <div class="card-image loading">
          <img
            src="${character.image}"
            alt="${character.name}"
            loading="lazy"
          />
        </div>

        <span class="character-status ${character.status.toLowerCase()}">
          <span class="status-dot"></span>
          ${character.status}
        </span>

        <div class="card-content">
          <h3 class="character-name">${character.name}</h3>

          <p class="character-species">
            ${character.species} · ${character.gender}
          </p>

          <div class="character-info">
            <div class="info-item">
              <span class="info-label">Origin</span>
              <span class="info-value">${character.origin.name || "Unknown"}</span>
            </div>

            <div class="info-item">
              <span class="info-label">Last known location</span>
              <span class="info-value">${character.location.name || "Unknown"}</span>
            </div>
          </div>
        </div>
      </a>
    </article>
  `;
}
