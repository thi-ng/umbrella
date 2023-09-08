import type { FnN2 } from "@thi.ng/api";
import { HALF_PI } from "@thi.ng/math/api";

/**
 * Reference:
 * - https://en.wikipedia.org/wiki/Gibbs_phenomenon
 * - https://web.archive.org/web/20031210115616/http://www.musicdsp.org/files/bandlimited.pdf
 *
 * [Interactive graph](https://www.desmos.com/calculator/irugw6gnhy)
 *
 * @param n - number of octaves
 * @param i - curr octave [1..n]
 */
export const gibbs: FnN2 = (n, i) => Math.cos(((i - 1) * HALF_PI) / n) ** 2;

/**
 * Fejér weight for `k`-th harmonic in a Fourier series of length `n`.
 *
 * @remarks
 * Used for attenuating the {@link gibbs} factor when summing a Fourier series.
 * Linearly attentuates higher harmonics, with the first bin receiving a weight
 * on 1 and the last bin `1/n`.
 *
 * @param k -
 * @param n -
 */
export const fejer: FnN2 = (k, n) => (n - k) / n;

/**
 * Polynomial attenuation to create bandlimited version of a signal.
 *
 * - http://research.spa.aalto.fi/publications/papers/smc2010-phaseshaping/
 * - http://www.kvraudio.com/forum/viewtopic.php?t=375517
 *
 * @param dt - time step
 * @param t - normalized phase
 */
export const polyBLEP: FnN2 = (dt, t) =>
	t < dt
		? ((t /= dt), t + t - t * t - 1)
		: t > 1 - dt
		? ((t = (t - 1) / dt), t * t + t + t + 1)
		: 0;
