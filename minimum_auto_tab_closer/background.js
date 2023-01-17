chrome.runtime.onMessage.addListener(
    function (_message, sender) {
        chrome.tabs.remove(sender.tab.id);
    }
);
