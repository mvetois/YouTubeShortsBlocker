const toggleBtn = document.getElementById("toggle");

function updateButton(enabled) {
    const text = enabled ? chrome.i18n.getMessage("toggle_on"): chrome.i18n.getMessage("toggle_off");
    
    toggleBtn.textContent = text;
    toggleBtn.style.backgroundColor = enabled ? "#cc0000" : "#4CAF50";
}

chrome.storage.local.get("enabled", (data) => {
    updateButton(data.enabled);
});

toggleBtn.addEventListener("click", () => {
    chrome.storage.local.get("enabled", (data) => {
        const newValue = !data.enabled;
        chrome.storage.local.set({ enabled: newValue }, () => {
            updateButton(newValue);

            chrome.tabs.query({ url: "*://www.youtube.com/*" }, (tabs) => {
                tabs.forEach((tab) => {
                    if (newValue) {
                        chrome.tabs.sendMessage(tab.id, {
                        action: "toggle",
                        enabled: true
                        });
                    } else {
                        chrome.tabs.reload(tab.id);
                    }
                });
            });
        });
    });
});
