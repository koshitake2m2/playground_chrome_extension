const targetUrls = [
  "https://zoom.us/test",
  /^https?:\/\/(.*\.)?zoom\.us\/j\/.*#success/,
  /^https?:\/\/.*\.slack\.com\/archives\/.*/,
  /^https?:\/\/www\.notion\.so\/native\//,
];

export function isMatched(url) {
  return targetUrls.some((m) => url.match(m));
}
