// background.js (service worker)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Toggle lofi effect message received");

    const { tabId, action } = message;
    chrome.storage.local.get("isLofiActive", (result) => {
        const isLofiActive = result.isLofiActive || false;
        console.log("isLofiActive:", isLofiActive);

        if (action === "startLofi" && tabId && !isLofiActive) {
            console.log("Starting lofi effect...");
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: () => {
                    const audio = document.querySelector('audio, video');
                    if (audio) {
                        audio.playbackRate = 0.8; 
                        const audioContext = new AudioContext();
                        const source = audioContext.createMediaElementSource(audio);
                        const gainNode = audioContext.createGain();
                        gainNode.gain.value = 0.8; 

                        const filterNode = audioContext.createBiquadFilter();
                        filterNode.type = "lowpass";
                        filterNode.frequency.value = 800;

                        const bassBoostNode = audioContext.createBiquadFilter();
                        bassBoostNode.type = "lowshelf";
                        bassBoostNode.frequency.value = 100; 
                        bassBoostNode.gain.value = 15; 

                        source.connect(bassBoostNode).connect(filterNode).connect(gainNode).connect(audioContext.destination);
                        console.log("Lofi effects applied.");
                    } else {
                        console.log("No audio element found on this page.");
                    }
                }
            });

            chrome.storage.local.set({ isLofiActive: true }, () => console.log("Lofi effect activated"));
        } else if (action === "stopLofi" && tabId && isLofiActive) {
            console.log("Stopping lofi effect...");
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: () => {
                    if (typeof stopLofiEffect === "function") {
                        stopLofiEffect(); 
                    } else {
                        console.log("stopLofiEffect function is not available.");
                    }
                }
            });

            chrome.storage.local.set({ isLofiActive: false }, () => console.log("Lofi effect deactivated"));
        } else {
            console.log("Invalid tab ID or action or lofi already active/inactive.");
        }
    });
});
