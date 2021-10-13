import type { IReset } from "@thi.ng/api";
import { PI } from "@thi.ng/math/api";
import { clamp05 } from "@thi.ng/math/interval";
import type { SVFType } from "./api.js";
import { AProc } from "./aproc.js";

export const svfLP = (fc: number, q?: number) => new SVF("lp", fc, q);

export const svfHP = (fc: number, q?: number) => new SVF("hp", fc, q);

export const svfBP = (fc: number, q?: number) => new SVF("bp", fc, q);

export const svfNotch = (fc: number, q?: number) => new SVF("notch", fc, q);

export const svfPeak = (fc: number, q?: number) => new SVF("peak", fc, q);

export const svfAllpass = (fc: number, q?: number) => new SVF("all", fc, q);

/**
 * Multi-type state variable filter w/ trapezoidal integration, after
 * Andrew Simper.
 *
 * Reference:
 *
 * - https://cytomic.com/files/dsp/SvfLinearTrapOptimised2.pdf
 * - https://en.wikipedia.org/wiki/Trapezoidal_rule
 */
export class SVF extends AProc<number, number> implements IReset {
    protected _a1!: number;
    protected _a2!: number;
    protected _c1!: number;
    protected _c2!: number;
    protected _g!: number;
    protected _k!: number;

    constructor(
        protected _type: SVFType,
        protected _freq: number,
        protected _q = 0.5
    ) {
        super(0);
        this.reset();
        this.computeCoeffs();
    }

    reset() {
        this._c1 = this._c2 = this._val = 0;
        return this;
    }

    next(x: number) {
        const { _c1, _c2 } = this;
        const x1 = this._a1 * _c1 + this._a2 * (x - _c2);
        const x2 = _c2 + this._g * x1;
        this._c1 = 2 * x1 - _c1;
        this._c2 = 2 * x2 - _c2;
        // TODO support type morphing / interpolation?
        switch (this._type) {
            case "lp":
                return (this._val = x2);
            case "hp":
                return (this._val = x - this._k * x1 - x2);
            case "bp":
                return (this._val = x1);
            case "notch":
                return (this._val = x - this._k * x1);
            case "peak":
                return (this._val = 2 * x2 - x + this._k * x1);
            case "all":
                return (this._val = x - 2 * this._k * x1);
        }
    }

    set(fc: number, q: number) {
        this._freq = fc;
        this._q = q;
        this.computeCoeffs();
    }

    setFreq(fc: number) {
        this._freq = fc;
        this.computeCoeffs();
    }

    setQ(q: number) {
        this._q = q;
        this.computeCoeffs();
    }

    protected computeCoeffs() {
        this._freq = clamp05(this._freq);
        const g = (this._g = Math.tan(PI * this._freq));
        this._k = 2 - 2 * this._q;
        this._a1 = 1 / (1 + g * (g + this._k));
        this._a2 = g * this._a1;
    }
}
