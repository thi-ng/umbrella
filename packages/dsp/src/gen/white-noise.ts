import { IRandom, SYSTEM } from "@thi.ng/random";
import { AGen } from "./agen";

/**
 * White noise gen with customizable gain and
 * {@link @thi.ng/random#IRandom} source.
 *
 * @param gain -
 * @param rnd -
 */
export const whiteNoise = (gain?: number, rnd?: IRandom) =>
    new WhiteNoise(gain, rnd);

export class WhiteNoise extends AGen<number> {
    constructor(protected _gain = 1, protected _rnd: IRandom = SYSTEM) {
        super(0);
    }

    next() {
        return (this._val = this._rnd.norm(this._gain));
    }
}
