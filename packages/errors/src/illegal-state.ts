export class IllegalStateError extends Error {
    constructor(msg?: any) {
        super("illegal state" + (msg !== undefined ? ": " + msg : ""));
    }
}

export const illegalState =
    (msg?: any): never => {
        throw new IllegalStateError(msg);
    };
