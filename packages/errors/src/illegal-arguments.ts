export class IllegalArgumentError extends Error {
    constructor(msg?: any) {
        super("illegal argument(s)" + (msg !== undefined ? ": " + msg : ""));
    }
}

export function illegalArgs(msg?: any) {
    throw new IllegalArgumentError(msg);
}
