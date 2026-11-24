import { BASE_PATH } from "../config.js";

export function LocationCard(location) {
  return `
    <article class="info-card">
      <a href="${BASE_PATH}pages/location.html?id=${location.id}" class="info-card-link">
        <div class="info-card-header">
          <span class="info-card-label">${location.type}</span>
          <span class="info-card-meta">LOCATION #${location.id}</span>
        </div>

        <div class="info-card-content">
          <h3>${location.name}</h3>
          <p><span>Dimension:</span> ${location.dimension}</p>
        </div>

        <div class="info-card-footer">
          <span class="info-card-details">${location.residents.length} residents</span>
          <button class="info-card-btn">View Details →</button>
        </div>
      </a>
    </article>
  `;
}
