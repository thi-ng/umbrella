export function hasWASM() {
    return (typeof window !== "undefined" && typeof window["WebAssembly"] !== "undefined") ||
        (typeof global !== "undefined" && typeof global["WebAssembly"] !== "undefined");
}
