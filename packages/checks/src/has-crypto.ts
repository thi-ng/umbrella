export function hasCrypto() {
    return typeof window !== "undefined" && window["crypto"] !== undefined;
}
