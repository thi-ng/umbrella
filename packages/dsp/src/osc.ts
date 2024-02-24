import { isNumber } from "@thi.ng/checks/is-number";
import { Add, add } from "./add.js";
import { AGen } from "./agen.js";
import type { IGen, StatelessOscillator } from "./api.js";
import { Const } from "./const.js";
import { sum } from "./sum.js";

/**
 * Higher order oscillator gen, wrapping a {@link StatelessOscillator} function
 * and supporting either constant or {@link IGen}-based frequency and amplitude,
 * thus allowing for FM/AM modulation. Furthermore, a constant `dc` offset
 * (center value) and/or start `phase` can be specified (both default to: 0).
 *
 * @remarks
 * If `freq` is a number, it must be given as normalized frequency (same for
 * `phase`). If `freq` is an `IGen`, it must be configured to produce normalized
 * frequency values (e.g. if using an `Osc` by setting its `amp` to a normalized
 * freq and its `dc` offset to `baseFreq * TAU`). Also see {@link modOsc} for
 * syntax sugar. The `phase` arg is only used if `freq` is NOT an `IGen`.
 *
 * The oscillator initializes to zero and its
 * [`IDeref`](https://docs.thi.ng/umbrella/api/interfaces/IDeref.html).deref}
 * value is only available / valid after the first invocation of
 * {@link IGen.next}.
 *
 * @param osc - stateless osc
 * @param freq - normalized freq
 * @param amp - amplitude
 * @param dc - DC offset / center value
 * @param phase - normalized start phase
 */
export const osc = (
	osc: StatelessOscillator,
	freq: IGen<number> | number,
	amp?: IGen<number> | number,
	dc?: number,
	phase?: number
) => new Osc(osc, freq, amp, dc, phase);

/**
 * Syntax sugar for creating frequency modulated `Osc` gens.
 *
 * @remarks
 * The `fmod` value defines the +/- normalized frequency modulation
 * range, added to the main oscillator `freq`.
 *
 * @example
 * ```ts
 * import { modOsc, osc, saw, sin, rect } from "@thi.ng/dsp";
 *
 * // FM sin osc using rect osc as frequency modulator
 * modOsc(sin, 0.01, osc(rect, 0.1, 0.2))
 *
 * // AM sin osc using rect osc as amplitude modulator
 * modOsc(sin, 0.01, 0, osc(rect, 0.1, 0.2))
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
 * @param dc` - DC offset / center value
 * @param phase - normalized start phase
 */
export const modOsc = (
	osc: StatelessOscillator,
	freq: IGen<number> | number,
	fmod: IGen<number> | number,
	amod: IGen<number> | number = 1,
	dc?: number,
	phase?: number
) =>
	new Osc(
		osc,
		sum(
			isNumber(fmod) ? new Const(fmod) : fmod,
			isNumber(freq) ? add(freq) : freq
		),
		amod,
		dc,
		phase
	);

export class Osc extends AGen<number> {
	protected _phase!: IGen<number>;
	protected _amp!: IGen<number>;

	constructor(
		protected _osc: StatelessOscillator,
		freq: IGen<number> | number,
		amp: IGen<number> | number = 1,
		protected _dc = 0,
		phase = 0
	) {
		super(0);
		isNumber(freq) ? this.setFreq(freq, phase) : this.setFreq(freq);
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

	setFreq(freq: IGen<number>): void;
	setFreq(freq: number, phase?: number): void;
	setFreq(freq: number | IGen<number>, phase?: number) {
		this._phase = isNumber(freq) ? new Add(freq, phase || 0) : freq;
	}

	setAmp(amp: IGen<number> | number) {
		this._amp = isNumber(amp) ? new Const(amp) : amp;
	}
}
