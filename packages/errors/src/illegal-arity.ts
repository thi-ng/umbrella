export class IllegalArityError extends Error {
    constructor(n: number) {
        super(`illegal arity: ${n}`);
    }
}

export const illegalArity = (n: number): never => {
    throw new IllegalArityError(n);
};
