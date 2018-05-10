export class IllegalArgumentError extends Error {
    constructor(msg?: any) {
        super("illegal argument(s)" + (msg !== undefined ? ": " + msg : ""));
    }
}

export function illegalArgs(msg?: any): never {
    throw new IllegalArgumentError(msg);
}
