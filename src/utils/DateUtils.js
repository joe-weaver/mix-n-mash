
const fmt = new Intl.DateTimeFormat('en-US', {dateStyle: "short", timeStyle: "short"});
export function formatDate(dateString) {
  return fmt.format(new Date(dateString));
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
