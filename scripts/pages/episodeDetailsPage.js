import { getElement } from "../utils/dom.js";
import { episodeDetailsElements } from "../dom/episodeDetailsElements.js";
import { fetchApiData } from "../api/apiClient.js";
import { getEpisodeById } from "../api/resources.js";
import { renderCharacters } from "../render/renderCharacters.js";
import { showErrorMessage } from "../utils/errorMessages.js";
import { getIdSearchParam } from "../utils/searchParams.js";
import { extractSeason, extractEpisode } from "../utils/episode.js";
import { handleImageLoading } from "../utils/imageLoader.js";

// Update breadcrumb
function updateEpisodeBreadcrumb(episode) {
  const { episodeName } = episodeDetailsElements.breadcrumb;

  episodeName.textContent = episode.name || "Unknown";
}

// Update episode profile
function updateEpisodeProfile(episode) {
  const elements = episodeDetailsElements.episodeProfile;

  const seasonNumber = extractSeason(episode);
  const episodeNumber = extractEpisode(episode);

  const {
    codes,
    names,
    label,
    subtitle,
    season,
    number,
    airDate,
    id,
    created,
  } = elements;

  codes.forEach((code) => {
    code.textContent = episode.episode;
  });

  names.forEach((name) => {
    name.textContent = episode.name;
  });

  label.textContent = `EPISODE PROFILE #${episode.id}`;
  subtitle.textContent = `Season ${seasonNumber} - Episode ${episodeNumber}`;
  season.textContent = seasonNumber;
  number.textContent = episodeNumber;
  airDate.textContent = episode.air_date;
  id.textContent = episode.id;
  created.textContent = episode.created;
}

async function updateEpisodeCharacters(episode) {
  const elements = episodeDetailsElements.episodeCharacters;
  const characterUrls = episode.characters;

  elements.characterCount.textContent = characterUrls.length;

  const characters = await Promise.all(
    characterUrls.map((url) => fetchApiData(url)),
  );

  renderCharacters(characters, elements.characterGrid);

  document.querySelectorAll(".card-image img").forEach((img) => {
    handleImageLoading(img);
  });
}

async function initializeEpisodeDetailsPage() {
  try {
    const episodeId = getIdSearchParam();
    if (!episodeId) return;

    // fetch the episode
    const episode = await getEpisodeById(episodeId);

    updateEpisodeBreadcrumb(episode);
    updateEpisodeProfile(episode);
    updateEpisodeCharacters(episode);
  } catch (error) {
    const container = getElement(".main-container");
    showErrorMessage(error, container, "Failed to load episode.");
    console.error(error);
  }
}

async function main() {
  initializeEpisodeDetailsPage();
}

main();
