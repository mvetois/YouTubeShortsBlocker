function removeShorts() {
    document.querySelectorAll('a[href*="/shorts/"]').forEach(el => {
        const parent = el.closest('ytd-grid-video-renderer, ytd-rich-item-renderer, ytd-video-renderer, ytd-reel-shelf-renderer');
        if (parent) {
            parent.remove();
        } else {
            el.remove();
        }
    });
  
    document.querySelectorAll('ytd-reel-shelf-renderer').forEach(el => el.remove());
}
  
function applyShortsFilter(enabled) {
    if (enabled) {
        removeShorts();
        observer.observe(document.body, { childList: true, subtree: true });
    } else {
        observer.disconnect();
    }
}
  
const observer = new MutationObserver(removeShorts);
  
chrome.storage.local.get("enabled", (data) => {
    applyShortsFilter(data.enabled);
});
  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggle") {
        applyShortsFilter(request.enabled);
    }
});