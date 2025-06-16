// Keeps SYNTHEOS active for 5 minutes post-interaction
let timer: ReturnType<typeof setTimeout> | null = null;

export function stayAwake() {
    if (timer) clearTimeout(timer);
    console.log("SYNTHEOS is awake.");
    timer = setTimeout(() => {
        console.log("SYNTHEOS is now asleep.");
    }, 5 * 60 * 1000);
}