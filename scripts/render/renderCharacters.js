import { CharacterCard } from "../components/CharacterCard.js";

export function renderCharacters(characters, container) {
  container.innerHTML = characters
    .map((character) => CharacterCard(character))
    .join("");
}
