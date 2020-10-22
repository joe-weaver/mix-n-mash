export function formatDate(date) {
  let dmy =
    date.getMonth() +
    1 +
    "/" +
    date.getDate() +
    "/" +
    shortenYear(date.getFullYear());
  let time =
    (date.getHours() % 12) +
    1 +
    ":" +
    date.getMinutes() +
    getAMPM(date.getHours);
  return dmy + ", " + time;
}

function shortenYear(year) {
  let syear = "" + (year % 100);
  if (syear.length === 0) {
    syear = "00";
  } else if (syear.length === 1) {
    syear = "0" + syear;
  }
  return syear;
}

export function getAMPM(hour) {
  if (hour >= 12) {
    return "PM";
  } else {
    return "AM";
  }
}
