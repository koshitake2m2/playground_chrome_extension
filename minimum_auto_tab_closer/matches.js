const targetUrls = [
  "https://zoom.us/test",
  /^https?:\/\/(.*\.)?zoom\.us\/j\/.*#success/,
  /^https?:\/\/.*\.slack\.com\/archives\/.*/,
];

export function isMatched(url) {
  return targetUrls.some((m) => url.match(m));
}
