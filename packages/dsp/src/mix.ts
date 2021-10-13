import { clamp01 } from "@thi.ng/math/interval";
import { AProc2 } from "./aproc.js";

export class Mix extends AProc2<number, number, number> {
    constructor(protected _t: number) {
        super(0);
    }

    get mix() {
        return this._t;
    }

    set mix(x: number) {
        this._t = clamp01(x);
    }

    next(a: number, b: number) {
        return (this._val = a + (b - a) * this._t);
    }
}
