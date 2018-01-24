declare var SharedArrayBuffer: any;

export function isTransferable(x: any) {
    return x instanceof ArrayBuffer ||
        (typeof SharedArrayBuffer !== "undefined" && x instanceof SharedArrayBuffer) ||
        (typeof MessagePort !== "undefined" && x instanceof MessagePort);
}
