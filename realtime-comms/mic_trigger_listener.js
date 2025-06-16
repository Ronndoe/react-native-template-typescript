// Mock listener for wearable mic button
export function onMicTrigger(callback) {
    console.log("Listening for wearable mic button press...");
    setTimeout(() => callback(), 1000); // Simulated press
}
