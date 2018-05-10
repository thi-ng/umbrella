export class IllegalArityError extends Error {
    constructor(n: number) {
        super(`illegal arity: ${n}`);
    }
}

export function illegalArity(n) {
    throw new IllegalArityError(n);
}
