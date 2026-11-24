import { fetchApiData } from "../api/apiClient.js";
import { getCharacterById } from "../api/resources.js";
import { characterDetailsElements } from "../dom/characterDetailsElements.js";
import { renderEpisodes } from "../render/renderEpisodes.js";
import { getElement } from "../utils/dom.js";
import { showErrorMessage } from "../utils/errorMessages.js";
import { handleImageLoading } from "../utils/imageLoader.js";
import { getIdSearchParam } from "../utils/searchParams.js";

// Update breadcrumb
function updateCharacterBreadcrumb(character) {
  const { characterName } = characterDetailsElements.breadcrumb;

  characterName.textContent = character.name || "Unknown";
}

// Update character profile
function updateCharacterProfile(character) {
  const elements = characterDetailsElements.characterProfile;

  const {
    image,
    status,
    statusText,
    label,
    name,
    subtitle,
    species,
    gender,
    origin,
    location,
    type,
    created,
  } = elements;

  const characterName = character.name || "Unknown";
  const characterSpecies = character.species || "Unknown";
  const characterGender = character.gender || "Unknown";
  const characterStatus = character.status?.toLowerCase() || "unknown";

  // Image
  image.src = character.image;
  image.alt = characterName;
  handleImageLoading(image);

  // Status
  status.classList.remove("alive", "dead", "unknown");
  status.classList.add(characterStatus);
  statusText.textContent = character.status || "Unknown";

  // Heading
  label.textContent = `CHARACTER PROFILE #${character.id}`;
  name.textContent = characterName;
  subtitle.textContent = `${characterSpecies} - ${characterGender}`;

  // Character information
  species.textContent = characterSpecies;
  gender.textContent = characterGender;
  origin.textContent = character.origin?.name || "Unknown";
  location.textContent = character.location?.name || "Unknown";
  type.textContent = character.type || "Unknown";
  created.textContent = character.created || "Unknown";
}

// Update character episodes
async function updateCharacterEpisodes(character) {
  const elements = characterDetailsElements.characterEpisodes;

  elements.sectionDescription.textContent = `Episodes featuring ${character.name}.`;

  elements.episodeCount.textContent = character.episode.length;

  // Fetch all episodes concurrently
  const episodes = await Promise.all(
    character.episode.map((episodeUrl) => fetchApiData(episodeUrl)),
  );

  renderEpisodes(episodes, elements.episodeGrid);
}

async function initializeCharacterDetailsPage() {
  try {
    const characterId = getIdSearchParam();
    if (!characterId) return;

    // fetch the character
    const character = await getCharacterById(characterId);

    updateCharacterBreadcrumb(character);
    updateCharacterProfile(character);
    updateCharacterEpisodes(character);
  } catch (error) {
    const container = getElement(".main-container");
    showErrorMessage(error, container, "Failed to load character.");
    console.error(error);
  }
}

async function main() {
  initializeCharacterDetailsPage();
}

main();
