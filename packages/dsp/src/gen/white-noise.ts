import { IRandom, SYSTEM } from "@thi.ng/random";
import { AGen } from "./agen";

export class WhiteNoise extends AGen<number> {
    constructor(protected _gain = 1, protected _rnd: IRandom = SYSTEM) {
        super(0);
    }

    next() {
        return (this._val = this._rnd.norm(this._gain));
    }
}
