import { isMatched } from "./matches.js";

describe("isMatched", () => {
  it("returns true if target urls contains input url", () => {
    const urls = [
      `https://a.zoom.us/j/XXXX#success`,
      `https://zoom.us/j/XXXX#success`,
      `https://a.slack.com/archives/XXXX/XXXX`,
    ];
    urls.forEach((url) => {
      expect(isMatched(url)).toEqual(true);
    });
  });

  it("returns false if target urls doesn't contain input url", () => {
    const urls = [
      `https://www.google.com`,
      `https://zoom.us/`,
      `https://slack.com/`,
    ];
    urls.forEach((url) => {
      expect(isMatched(url)).toEqual(false);
    });
  });
});
