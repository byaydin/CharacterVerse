import { BASE_PATH } from "./config.js";

async function main() {
  document.querySelectorAll(".logo").forEach((logo) => {
    logo.href = BASE_PATH;
  });
}

main();
