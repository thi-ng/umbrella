import { PI, TAU } from "@thi.ng/math";
import { AProc } from "./aproc";

export abstract class ATwoPole2 extends AProc<number, number> {
    protected _c1!: number;
    protected _c2!: number;
    protected _z1!: number;
    protected _z2!: number;
    protected _gain: number;
    protected _cos!: number;
    protected _rad!: number;
    protected _freq!: number;
    protected _width!: number;

    abstract next(x: number): number;

    constructor(freq: number, width: number) {
        super(0);
        this._gain = 0;
        this.zero();
        this.setFreq(freq);
        this.setWidth(width);
    }

    zero() {
        this._z1 = this._z2 = 0;
    }

    setFreq(freq: number) {
        this._freq = freq;
        this._cos = Math.cos(freq * TAU);
        this._c1 = 2 * this._rad * this._cos;
    }

    setWidth(width: number) {
        this._width = width;
        this._rad = Math.exp(-PI * width);
        this._c2 = -(this._rad ** 2);
        this._c1 = 2 * this._rad * this._cos;
    }
}
