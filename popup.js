// popup.js
document.getElementById("stop").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab && tab.id) {
        chrome.runtime.sendMessage({
            tabId: tab.id,
            action: "stopLofi"
        });
    } else {
        console.log("No active tab found or invalid tab ID.");
    }
});

document.getElementById("start").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab && tab.id) {
        chrome.runtime.sendMessage({
            tabId: tab.id,
            action: "startLofi"
        });
    } else {
        console.log("No active tab found or invalid tab ID.");
    }
});
