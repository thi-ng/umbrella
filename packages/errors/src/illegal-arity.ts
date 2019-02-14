export class IllegalArityError extends Error {
    constructor(n: number) {
        super(`illegal arity: ${n}`);
    }
}

export const illegalArity =
    (n): never => {
        throw new IllegalArityError(n);
    };
