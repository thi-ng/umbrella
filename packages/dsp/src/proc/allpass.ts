import { PI, QUARTER_PI } from "@thi.ng/math";
import { AProc } from "./aproc";
import { ATwoPole2 } from "./atwopole";

export class AllPass1 extends AProc<number, number> {
    protected _fc!: number;
    protected _c!: number;
    protected _z1!: number;

    constructor(fc: number) {
        super(0);
        this.setFreq(fc);
        this.zero();
    }

    next(x: number) {
        const { _c, _z1 } = this;
        x -= _z1 * _c;
        const out = x * _c + _z1;
        this._z1 = x;
        return out;
    }

    zero() {
        this._z1 = 0;
    }

    low(x: number) {
        return (x + this.next(x)) * 0.5;
    }

    high(x: number) {
        return (x - this.next(x)) * 0.5;
    }

    setFreq(freq: number) {
        this._fc = freq;
        this._c = Math.tan(freq * PI - QUARTER_PI);
    }
}

export class AllPass2 extends ATwoPole2 {
    next(x: number) {
        const { _c1, _c2, _z1, _z2 } = this;
        const t = x + _z1 * _c1 + _z2 * _c2;
        const out = _z2 - _z1 * _c1 - t * _c2;
        this._z2 = _z1;
        this._z1 = t;
        return out;
    }
}
