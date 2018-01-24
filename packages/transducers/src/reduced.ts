import { IDeref } from "@thi.ng/api/api";

export class Reduced<T> implements
    IDeref<T> {

    protected value: T;

    constructor(val: T) {
        this.value = val;
    }

    deref() {
        return this.value;
    }
}

export function reduced(x: any): any {
    return new Reduced(x);
}

export function isReduced<T>(x: any): x is Reduced<T> {
    return x instanceof Reduced;
}

export function ensureReduced(x: any) {
    return x instanceof Reduced ? x : new Reduced(x);
}

export function unreduced(x: any) {
    return x instanceof Reduced ? x.deref() : x;
}
