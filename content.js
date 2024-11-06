// content.js
let audioContext = null;
let sourceNode = null;
let gainNode = null;
let filterNode = null;
let bassBoostNode = null;

function startLofiEffect() {
    if (audioContext) return; 

    audioContext = new AudioContext();
    const audioElement = document.querySelector('audio, video');
    if (!audioElement) {
        console.log("No audio element found on this page.");
        return;
    }

    sourceNode = audioContext.createMediaElementSource(audioElement);
    audioElement.playbackRate = 0.75;

    gainNode = audioContext.createGain();
    gainNode.gain.value = 0.8; 

    filterNode = audioContext.createBiquadFilter();
    filterNode.type = "lowpass";
    filterNode.frequency.value = 800;

    bassBoostNode = audioContext.createBiquadFilter();
    bassBoostNode.type = "lowshelf";
    bassBoostNode.frequency.value = 10;
    bassBoostNode.gain.value = 100; 
    console.log("Lofi effect started.");
    sourceNode.connect(bassBoostNode).connect(filterNode).connect(gainNode).connect(audioContext.destination);
    console.log("Lofi effects applied.");
}

function stopLofiEffect() {
    if (audioContext) {
        audioContext.close().then(() => {
            console.log("Audio context closed");
            audioContext = null;
        }).catch(error => console.error("Error closing audio context:", error));
    } else {
        console.log("No active audio context to stop.");
    }
}
