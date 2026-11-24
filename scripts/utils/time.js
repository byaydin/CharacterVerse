export function secondsToMs(seconds) {
  return seconds * 1000;
}

export function minutesToMs(minutes) {
  return secondsToMs(minutes * 60);
}

export function hoursToMs(hours) {
  return minutesToMs(hours * 60);
}
