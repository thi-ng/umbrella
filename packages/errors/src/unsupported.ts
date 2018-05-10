export class UnsupportedOperationError extends Error {
    constructor(msg?: any) {
        super("unsupported operation" + (msg !== undefined ? ": " + msg : ""));
    }
}

export function unsupported(msg?: any) {
    throw new UnsupportedOperationError(msg);
}
