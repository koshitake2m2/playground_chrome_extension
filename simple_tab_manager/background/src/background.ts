console.log('hello');
console.log('hello2');

const refresh = (): void => {
  chrome.tabs.query({ pinned: false }).then((tabs) => {
    console.log('tabs', tabs);
  });
};

chrome.tabs.onCreated.addListener(() => {
  refresh();
});
