chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ enabled: true });
    chrome.tabs.query({ url: "*://www.youtube.com/*" }, (tabs) => {
        tabs.forEach((tab) => {
            chrome.tabs.reload(tab.id);
        });
    });
});