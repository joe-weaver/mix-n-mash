
const fmt = new Intl.DateTimeFormat('en-US', {dateStyle: "short", timeStyle: "short"});
export function formatDate(dateString) {
  return fmt.format(new Date(dateString));
}
