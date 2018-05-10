export class IllegalStateError extends Error {
    constructor(msg?: any) {
        super("illegal state" + (msg !== undefined ? ": " + msg : ""));
    }
}

export function illegalState(msg?: any): never {
    throw new IllegalStateError(msg);
}
