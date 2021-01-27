export const createTimeStamp = (time) => {
  const sec = time % 60;
  const min = Math.floor(time / 60);

  if (min > 0) {
    if (sec < 10) return `${min}:0${sec}`;
    return `${min}:${sec}`;
  }
  if (sec < 10) return `0:0${sec}`;
  return `0:${sec}`;
};

export const createDate = (date) => {
  const then = Math.floor(new Date().getTime() / 1000) - Math.floor(date / 1000);

  if (then < 86400) {
    if (then / 3600 < 2) return 'Fyrir klukkutíma síðan';
    return `Fyrir ${Math.floor(then / 3600)} klukkutímum síðan`;
  } // hours
  if (then < 604800) {
    if (then / 86400 < 2) return 'Fyrir degi síðan';
    return `Fyrir ${Math.floor(then / 86400)} dögum síðan`;
  } // day
  if (then < 2592000) {
    if (then / 604800 < 2) return 'Fyrir viku síðan';
    return `Fyrir ${Math.floor(then / 604800)} vikum síðan`;
  } // week
  if (then < 31536000) {
    if (then / 2592000 < 2) return 'Fyrir mánuði síðan';
    return `Fyrir ${Math.floor(then / 2592000)} mánuðum síðan`;
  } // months

  if (then / 31536000 < 2) return 'Fyrir ári síðan';
  return `Fyrir ${Math.floor(then / 31536000)} árum síðan`;
  // years
};
