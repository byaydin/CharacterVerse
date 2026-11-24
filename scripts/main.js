import { BASE_PATH } from "./config.js";
import { getElement } from "./utils/dom.js";

async function main() {
  getElement(".logo").href = `${BASE_PATH}`;
}

main();
