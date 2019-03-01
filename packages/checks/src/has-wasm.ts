export const hasWASM = () =>
    (typeof window !== "undefined" &&
        typeof window["WebAssembly"] !== "undefined") ||
    (typeof global !== "undefined" &&
        typeof global["WebAssembly"] !== "undefined");
