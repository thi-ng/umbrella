export function isFirefox() {
    return typeof window !== "undefined" && !!window["InstallTrigger"];
}
