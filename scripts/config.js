export const HOST_NAME = "byaydin.github.io";

export const BASE_PATH =
  window.location.hostname === HOST_NAME ? "/CharacterVerse/" : "/";

console.log("Hostname:", window.location.hostname);
console.log("BASE_PATH:", BASE_PATH);
