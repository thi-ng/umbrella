export class IllegalArityError extends Error {
    constructor(n: number) {
        super(`illegal arity: ${n}`);
    }
}

export class IllegalArgumentError extends Error {
    constructor(msg?: any) {
        super("illegal argument(s)" + (msg !== undefined ? ": " + msg : ""));
    }
}

export class IllegalStateError extends Error {
    constructor(msg?: any) {
        super("illegal state" + (msg !== undefined ? ": " + msg : ""));
    }
}

export class UnsupportedOperationError extends Error {
    constructor(msg?: any) {
        super("unsupported operation" + (msg !== undefined ? ": " + msg : ""));
    }
}

export function illegalArity(n) {
    throw new IllegalArityError(n);
}

export function illegalArgs(msg?: any) {
    throw new IllegalArgumentError(msg);
}

export function illegalState(msg?: any) {
    throw new IllegalStateError(msg);
}

export function unsupported(msg?: any) {
    throw new UnsupportedOperationError(msg);
}
