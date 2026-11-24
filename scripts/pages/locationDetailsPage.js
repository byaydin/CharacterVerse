import { getElement } from "../utils/dom.js";
import { locationDetailsElements } from "../dom/locationDetailsElements.js";
import { fetchApiData } from "../api/apiClient.js";
import { getLocationById } from "../api/resources.js";
import { renderCharacters } from "../render/renderCharacters.js";
import { showErrorMessage } from "../utils/errorMessages.js";
import { getIdSearchParam } from "../utils/searchParams.js";
import { handleImageLoading } from "../utils/imageLoader.js";

// Update breadcrumb
function updateLocationBreadcrumb(location) {
  const { locationName } = locationDetailsElements.breadcrumb;

  locationName.textContent = location.name || "Unknown";
}

// Update location profile
function updateLocationProfile(location) {
  const elements = locationDetailsElements.locationProfile;

  const {
    names,
    types,
    label,
    subtitle,
    dimension,
    residentCount,
    id,
    created,
  } = elements;

  names.forEach((name) => {
    name.textContent = location.name;
  });

  types.forEach((type) => {
    type.textContent = location.type;
  });

  label.textContent = `LOCATION PROFILE #${location.id}`;
  subtitle.textContent = `${location.type} · ${location.dimension}`;
  dimension.textContent = location.dimension;

  residentCount.forEach((count) => {
    count.textContent = `${location.residents.length} Residents`;
  });

  id.textContent = location.id;
  created.textContent = location.created;
}

// Update location residents
async function updateLocationResidents(location) {
  const elements = locationDetailsElements.locationResidents;
  const residentUrls = location.residents;

  elements.residentCount.forEach((count) => {
    count.textContent = `${residentUrls.length} Residents`;
  });

  const residents = await Promise.all(
    residentUrls.map((url) => fetchApiData(url)),
  );

  renderCharacters(residents, elements.residentGrid);

  document.querySelectorAll(".card-image img").forEach((img) => {
    handleImageLoading(img);
  });
}

async function initializeLocationDetailsPage() {
  try {
    const locationId = getIdSearchParam();
    if (!locationId) return;

    // Fetch the location
    const location = await getLocationById(locationId);

    updateLocationBreadcrumb(location);
    updateLocationProfile(location);
    await updateLocationResidents(location);
  } catch (error) {
    const container = getElement(".main-container");

    showErrorMessage(error, container, "Failed to load location.");
  }
}

async function main() {
  initializeLocationDetailsPage();
}

main();
