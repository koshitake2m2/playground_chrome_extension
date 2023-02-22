chrome.runtime.onMessage.addListener(
    function (_message, sender) {
        setTimeout(function () {
            chrome.tabs.remove(sender.tab.id);
        }, 2000);
    }
);
