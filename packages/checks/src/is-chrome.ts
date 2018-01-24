export function isChrome() {
    return typeof window !== "undefined" && !!window["chrome"];
}
