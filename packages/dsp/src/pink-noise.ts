import type { IReset, Tuple } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import { AGen } from "./agen.js";

export type PNoiseCoeffs = Tuple<number, 5>;
const AMP = <PNoiseCoeffs>[3.8024, 2.9694, 2.597, 3.087, 3.4006];
const PROB = <PNoiseCoeffs>[0.00198, 0.0128, 0.049, 0.17, 0.682];

/**
 * Pink noise generator with customizable frequency distribution. The
 * default config produces a power spectrum roughly following the `1/f`
 * pink characteristic.
 *
 * @remarks
 * Custom frequency/power distributions can be obtained by providing
 * `amp` and `prob`ability tuples for the 5 internal bins used to
 * compute the noise. `amp` defines per-bin power contributions, the
 * latter bin update probabilities.
 *
 * Resulting noise values are normalized to given `gain`, which itself
 * is scale relative to the sum of given `amp` values.
 *
 * References:
 * - http://web.archive.org/web/20160513114217/http://home.earthlink.net/~ltrammell/tech/newpink.htm
 * - http://web.archive.org/web/20160515145318if_/http://home.earthlink.net/~ltrammell/tech/pinkalg.htm
 * - https://www.musicdsp.org/en/latest/Synthesis/220-trammell-pink-noise-c-class.html
 *
 * @param gain -
 * @param rnd -
 * @param amp -
 * @param prob -
 */
export const pinkNoise = (
	gain?: number,
	rnd?: IRandom,
	amp?: PNoiseCoeffs,
	prob?: PNoiseCoeffs
) => new PinkNoise(gain, rnd, amp, prob);

export class PinkNoise extends AGen<number> implements IReset {
	protected _bins: number[];
	protected _psum: number[];

	constructor(
		protected _gain = 1,
		protected _rnd: IRandom = SYSTEM,
		protected _amp: PNoiseCoeffs = AMP,
		prob: PNoiseCoeffs = PROB
	) {
		super(0);
		this._gain /= _amp.reduce((acc, x) => acc + x, 0);
		this._psum = prob.reduce(
			(acc: number[], x, i) => (
				acc.push(i > 0 ? acc[i - 1] + x : x), acc
			),
			[]
		);
		this._bins = [0, 0, 0, 0, 0];
	}

	reset() {
		this._bins.fill(0);
		return this;
	}

	next() {
		const { _bins, _rnd, _amp, _psum } = this;
		const bin = _rnd.float();
		for (let i = 0; i < 5; i++) {
			if (bin <= _psum[i]) {
				_bins[i] = _rnd.norm(_amp[i]);
				break;
			}
		}
		return (this._val =
			this._gain *
			(_bins[0] + _bins[1] + _bins[2] + _bins[3] + _bins[4]));
	}
}
