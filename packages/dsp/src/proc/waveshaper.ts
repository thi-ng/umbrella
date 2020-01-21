import { Fn2 } from "@thi.ng/api";
import { foldback as _foldback, PI } from "@thi.ng/math";
import { AProc } from "./aproc";

export type WaveShaperFn = Fn2<number, number, number>;

/**
 * Customizable wave shaper for user defined shaping function supporting
 * one (optional) adjustable curve parameter. The default implementation
 * is based on {@link waveshapeSigmoid} and supports configurable
 * curvature. Post-amplification (default: 1) is applied to the
 * transformed result value.
 *
 * @remarks
 * If `amp` is `true` (default), the curve will be normalized such that
 * input values in the [-1 .. 1] range will be mapped to the same output
 * interval. For the default sigmoid function this will produce out of
 * range outputs for inputs `abs(in) > 1`, especially if `coeff < 6`.
 *
 * Reference:
 * - https://www.desmos.com/calculator/fsamds9lvq
 *
 * @param thresh - fold threshold
 * @param amp - post amplifier / autogain flag
 */
export const waveShaper = (thresh?: number, amp?: number) =>
    new WaveShaper(thresh, amp);

export class WaveShaper extends AProc<number, number> {
    protected _amp!: number;
    protected _autoGain!: boolean;

    constructor(
        protected _coeff = 3,
        amp: number | true = true,
        protected _map: WaveShaperFn = waveshapeSigmoid
    ) {
        super(0);
        amp === true ? this.setAutoGain() : this.setAmp(amp);
    }

    next(x: number) {
        return (this._val = this._amp * this._map(x, this._coeff));
    }

    coeff() {
        return this._coeff;
    }

    setCoeff(t: number) {
        this._coeff = Math.max(t, 0);
        this._autoGain && this.setAutoGain();
    }

    amp() {
        return this._amp;
    }

    setAmp(a: number) {
        this._amp = a;
        this._autoGain = false;
    }

    setAutoGain() {
        this._amp = 1 / this._map(1, this._coeff);
        this._autoGain = true;
    }
}

export const waveshapeSigmoid: WaveShaperFn = (x, k) =>
    2 / (1 + Math.exp(-k * x)) - 1;

export const waveshapeSin: WaveShaperFn = (x, k) => Math.sin((PI / k) * x);
