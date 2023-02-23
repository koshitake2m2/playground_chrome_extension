chrome.runtime.sendMessage({}, function () { });

/**
 * Retry closing tab.
 * 
 * NOTE: (推測だが)service workderがなんらかの理由でunloadされているときがあり, 
 * unloadされている時はbackground.jsが作動しない.
 * そのため, loadされるのを待つために数回ページをリロードする.
 */
const KEY = 'retry_count';
const MAX_RETRY_COUNT = 3;
const RETRY_DURATION_MS = 5000;
chrome.storage.local.get(KEY).then((valuesByKey) => {
    const retryCount = valuesByKey[KEY] ?? 0;
    if (retryCount < MAX_RETRY_COUNT) {
        console.log(`closing tab... retry count: ${retryCount}`);
        const newData = {};
        newData[KEY] = retryCount + 1;
        setTimeout(function () {
            chrome.storage.local.set(newData).then(() => {
                location.reload();
            });
        }, RETRY_DURATION_MS);
    } else {
        var newData = {};
        newData[KEY] = 0;
        chrome.storage.local.set(newData);
        console.log(`stop closing tab. retry count: ${MAX_RETRY_COUNT}`);
    }
});
