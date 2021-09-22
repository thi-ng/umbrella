import { isNumber } from "@thi.ng/checks/is-number";
import { Add, add } from "./add";
import { AGen } from "./agen";
import type { IGen, StatelessOscillator } from "./api";
import { Const } from "./const";
import { sum } from "./sum";

/**
 * Higher order oscillator gen, wrapping a {@link StatelessOscillator}
 * function and supporting either constant or {@link IGen}-based
 * frequency and amplitude, thus allowing for FM/AM modulation.
 * Furthermore, a constant `dc` offset (center value) can be specified
 * (default: 0).
 *
 * @remarks
 * If `freq` is a number, it must be given as normalized frequency. If
 * `freq` is an `IGen`, it must be configured to produce normalized
 * frequency values (e.g. if using an `Osc` by setting its `amp` to a
 * normalized freq and its `dc` offset to `baseFreq * TAU`). Also see
 * {@link fmodOsc} for syntax sugar.
 *
 * The oscillator initializes to zero and its
 * {@link @thi.ng/api#IDeref.deref} value is only available / valid
 * after the first invocation of {@link IGen.next}.
 *
 * @param osc - stateless osc
 * @param freq - normalized freq
 * @param amp - amplitude
 * @param dc - DC offset / center value
 */
export const osc = (
    osc: StatelessOscillator,
    freq: IGen<number> | number,
    amp?: IGen<number> | number,
    dc?: number
) => new Osc(osc, freq, amp, dc);

/**
 * Syntax sugar for creating frequency modulated `Osc` gens.
 *
 * @remarks
 * The `fmod` value defines the +/- normalized frequency modulation
 * range, added to the main oscillator `freq`.
 *
 * @example
 * ```ts
 * // FM sin osc using rect osc as modulator
 * modOsc(sin, 0.01, osc(rect, 0.1, 0.2))
 *
 * // FM & AM sin osc using rect osc as fmod and saw as amod
 * modOsc(sin, 0.01, osc(rect, 0.1, 0.2), osc(saw, 0.05))
 *
 * ```
 *
 * @param osc - stateless main osc
 * @param freq - main osc freq
 * @param fmod - freq modulator
 * @param amod` - normalized freq
 */
export const modOsc = (
    osc: StatelessOscillator,
    freq: IGen<number> | number,
    fmod: IGen<number>,
    amod: IGen<number> | number = 1
) => new Osc(osc, sum(fmod, isNumber(freq) ? add(freq) : freq), amod);

export class Osc extends AGen<number> {
    protected _phase!: IGen<number>;
    protected _amp!: IGen<number>;

    constructor(
        protected _osc: StatelessOscillator,
        freq: IGen<number> | number,
        amp: IGen<number> | number = 1,
        protected _dc = 0
    ) {
        super(0);
        this.setFreq(freq);
        this.setAmp(amp);
    }

    next() {
        return (this._val = this._osc(
            this._phase.next(),
            1,
            this._amp.next(),
            this._dc
        ));
    }

    setFreq(freq: IGen<number> | number, phase = 0) {
        this._phase = isNumber(freq) ? new Add(freq, phase) : freq;
    }

    setAmp(amp: IGen<number> | number) {
        this._amp = isNumber(amp) ? new Const(amp) : amp;
    }
}
