import { isMatched } from "./matches.js";

const DELAY_MILLI = 5000;

function removeTabs() {
  setTimeout(() => {
    chrome.tabs.query({ pinned: false }).then((tabs) => {
      tabs.forEach((tab) => {
        if (tab.url && isMatched(tab.url) && tab.id) {
          console.log("remove tab", tab.id, tab.url);
          chrome.tabs.remove(tab.id).catch((reason) => console.log(reason));
        }
      });
    });
  }, DELAY_MILLI);
}

chrome.tabs.onCreated.addListener(() => {
  removeTabs();
});
chrome.tabs.onUpdated.addListener(() => {
  removeTabs();
});
chrome.tabs.onAttached.addListener(() => {
  removeTabs();
});
chrome.tabs.onReplaced.addListener(() => {
  removeTabs();
});
