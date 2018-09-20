module.exports = (config = {}) => {
  const nowInMillis = Date.now();
  const secondsInADay = 86400;
  const secondsInAWeek = 604800;

  if (config.custom) {
    return Math.floor(nowInMillis / 1000 - config.custom);
  } else if (config.day) {
    const dayAgoInSeconds = Math.floor(nowInMillis / 1000 - secondsInADay);
    return dayAgoInSeconds;
  } else if (config.week) {
    const weekAgoInSeconds = Math.floor(nowInMillis / 1000 - secondsInAWeek);
    return weekAgoInSeconds;
  }
  throw new Error(
    "Please supply a valid config object with a key/value of EITHER day:true, week:true, or custom: SECONDS"
  );
};
