(async () => {
  const src = chrome.runtime.getURL('content_scripts_main.js');
  await import(src);
})();
