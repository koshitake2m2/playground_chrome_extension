const KEY = 'koshitake2m2_minimum_auto_tab_closer';
chrome.runtime.onMessage.addListener(
    function (_message, sender) {
        setTimeout(function () {
            console.log((new Date).toLocaleString(), 'onMessage', sender.tab);
            chrome.tabs.remove(sender.tab.id).then(() => {
                var newData = {};
                newData[KEY] = 0;
                chrome.storage.local.set(newData);
            });
        }, 2000);
    }
);
