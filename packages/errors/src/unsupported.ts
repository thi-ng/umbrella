export class UnsupportedOperationError extends Error {
    constructor(msg?: any) {
        super("unsupported operation" + (msg !== undefined ? ": " + msg : ""));
    }
}

export const unsupported =
    (msg?: any): never => {
        throw new UnsupportedOperationError(msg);
    };
