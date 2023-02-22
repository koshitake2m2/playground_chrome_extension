chrome.runtime.sendMessage({}, function () { });

/**
 * Retry closing tab
 */
const KEY = 'koshitake2m2_minimum_auto_tab_closer';
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
