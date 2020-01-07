import { isNumber } from "@thi.ng/checks";
import { IGen, StatelessOscillator } from "../api";
import { Add, add } from "./add";
import { AGen } from "./agen";
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
 * The `modAmp` value defines the +/- normalized frequency modulation
 * range, added to the main oscillator `freq`.
 *
 * @example
 * ```ts
 * // rect modulated sin oscillator
 * fmodOsc(sin, osc(rect, 0.1, 0.2), 0.01)
 *
 *
 * ```
 *
 * @param osc
 * @param freq - normalized freq
 * @param modFreq - normalized freq
 * @param modAmp - normalized freq
 * @param phase - normalized start phase
 */
export const fmodOsc = (
    osc: StatelessOscillator,
    mod: IGen<number>,
    freq: IGen<number> | number,
    amp: IGen<number> | number
) => new Osc(osc, sum(mod, isNumber(freq) ? add(freq) : freq), amp);

export class Osc extends AGen<number> {
    protected phase!: IGen<number>;
    protected amp!: IGen<number>;

    constructor(
        protected osc: StatelessOscillator,
        freq: IGen<number> | number,
        amp: IGen<number> | number = 1,
        protected dc = 0
    ) {
        super(0);
        this.setFreq(freq);
        this.setAmp(amp);
    }

    next() {
        return (this.val = this.osc(
            this.phase.next(),
            1,
            this.amp.next(),
            this.dc
        ));
    }

    setFreq(freq: IGen<number> | number, phase = 0) {
        this.phase = isNumber(freq) ? new Add(freq, phase) : freq;
    }

    setAmp(amp: IGen<number> | number) {
        this.amp = isNumber(amp) ? new Const(amp) : amp;
    }
}
