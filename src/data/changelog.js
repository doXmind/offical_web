export const releases = [
  { version: "1.7.7", date: "2026-07-20", highlight: true, categories: ["added", "improved"] },
  { version: "1.7.6", date: "2026-07-20", highlight: true, categories: ["added", "improved"] },
  { version: "1.7.5", date: "2026-07-19", highlight: true, categories: ["improved", "fixed"] },
  { version: "1.1", date: "2026-03-12", highlight: true, categories: ["added", "improved", "fixed"] },
  { version: "1.0", date: "2026-03-08", highlight: true, categories: ["added", "improved", "fixed"] },
  { version: "0.9", date: "2026-03-03", highlight: false, categories: ["added", "improved"] },
  { version: "0.8", date: "2026-02-27", highlight: false, categories: ["added", "improved"] },
  { version: "0.7", date: "2026-02-20", highlight: false, categories: ["added", "improved"] },
  { version: "0.6", date: "2026-02-13", highlight: false, categories: ["added", "fixed"] },
  { version: "0.5", date: "2026-02-12", highlight: false, categories: ["added", "improved"] },
  { version: "0.4", date: "2026-02-10", highlight: true, categories: ["added", "improved"] },
  { version: "0.3", date: "2026-02-07", highlight: false, categories: ["added", "improved"] },
  { version: "0.2", date: "2026-02-04", highlight: false, categories: ["added"] },
  { version: "0.1", date: "2026-01-31", highlight: true, categories: ["added", "improved"] },
];

export function groupByYear(data) {
  const grouped = {};
  for (const release of data) {
    const year = new Date(release.date).getFullYear();
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(release);
  }
  return Object.entries(grouped)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, items]) => [Number(year), items]);
}

export function formatDate(dateStr, locale = 'en-US') {
  return new Date(dateStr + "T00:00:00").toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
