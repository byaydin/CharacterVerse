export function extractSeason(episode) {
  return Number(episode.episode.split("E")[0].replace("S", ""));
}

export function extractEpisode(episode) {
  return Number(episode.episode.split("E")[1]);
}
