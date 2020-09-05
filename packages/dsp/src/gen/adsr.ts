import type { IReset } from "@thi.ng/api";
import { clamp01 } from "@thi.ng/math";
import type { IGen } from "../api";
import { add } from "./add";
import { AGen } from "./agen";
import { curve } from "./curve";

const enum EnvPhase {
    ATTACK,
    DECAY,
    SUSTAIN,
    RELEASE,
    IDLE,
}

export interface ADSROpts {
    /**
     * Attack time (in samples). Default: 0
     */
    a: number;
    /**
     * Decay time (in samples). Default: 0
     */
    d: number;
    /**
     * Sustain level/gain (in [0..1] range). Default: 1
     */
    s: number;
    /**
     * Release time (in samples). Default: 0
     */
    r: number;
    /**
     * Attack curvature. Recommended range [0.0001 .. 10000]
     * (curved -> linear). Default: 0.1
     */
    acurve: number;
    /**
     * Decay & release curvature. Recommended range [0.0001 .. 10000]
     * (curved -> linear). Default: 0.1
     */
    dcurve: number;
    /**
     * Sustain phase duration (in samples). Default: Infinity. If a
     * finite value, then release phase is triggered automatically, else
     * needs to be triggered manually via {@link ADSR.release}.
     */
    slen: number;
    /**
     * Overall envelope gain / multiplier. Default: 1
     */
    gain: number;
}

/**
 * Time based ADSR envelope gen with customizable exponential attack,
 * decay and release curves.
 *
 * @remarks
 * The attack, decay and release options are to be given in samples
 * (`num = time_in_seconds * sample_rate`). Unless the sustain length
 * (`slen` opt) is finite (default: ∞), the release phase of the
 * envelope MUST be triggered manually by calling {@link ADSR.release}.
 * If only attack & decay phases are required, initialize the sustain
 * level to zero and configure `dcurve` to adjust falloff shape.
 *
 * The envelope can be re-used & restarted by calling
 * {@link ADSR.reset}. This will move the internal state back to the
 * beginning of the attack phase and start producing a new envelope with
 * current settings. Note: Any changes done to the envelope parameters
 * are only guaranteed to be fully applied after reset.
 *
 * The `acurve` and `dcurve` options can be used to control the
 * exponential curvature of the attack, decay and release phases.
 * Recommended range [0.0001 - 100] (curved -> linear).
 *
 * @param opts -
 */
export const adsr = (opts?: Partial<ADSROpts>) => new ADSR(opts);

export class ADSR extends AGen<number> implements IReset {
    protected _phase!: EnvPhase;
    protected _curve!: IGen<number>;
    protected _atime!: number;
    protected _dtime!: number;
    protected _rtime!: number;
    protected _acurve!: number;
    protected _dcurve!: number;
    protected _sustain!: number;
    protected _speriod!: number;
    protected _gain!: number;

    constructor(opts?: Partial<ADSROpts>) {
        super(0);
        opts = {
            a: 0,
            d: 0,
            s: 1,
            r: 0,
            acurve: 0.1,
            dcurve: 0.001,
            slen: Infinity,
            gain: 1,
            ...opts,
        };
        this.setAttack(opts.a!);
        this.setDecay(opts.d!);
        this.setRelease(opts.r!);
        this.setSustain(opts.s!, opts.slen);
        this.setCurveA(opts.acurve!);
        this.setCurveD(opts.dcurve!);
        this.setGain(opts.gain!);
        this.reset();
    }

    reset() {
        this._phase = EnvPhase.ATTACK;
        this._curve = curve(0, 1, this._atime + 1, this._acurve, true);
        this._val = 0;
        return this;
    }

    release() {
        if (this._phase < EnvPhase.RELEASE) {
            this._phase = EnvPhase.RELEASE;
            this._curve = curve(
                this._sustain,
                0,
                this._rtime + 1,
                this._dcurve,
                true
            );
        }
    }

    isSustained() {
        return this._phase === EnvPhase.SUSTAIN;
    }

    isDone() {
        return this._phase === EnvPhase.IDLE;
    }

    next() {
        let v: number;
        switch (this._phase) {
            case EnvPhase.IDLE:
                return 0;
            case EnvPhase.ATTACK:
                v = this._curve.next();
                if (v >= 1) {
                    v = 1;
                    this._phase = EnvPhase.DECAY;
                    this._curve = curve(
                        1,
                        this._sustain,
                        this._dtime + 1,
                        this._dcurve,
                        true
                    );
                }
                break;
            case EnvPhase.DECAY:
                v = this._curve.next();
                if (v <= this._sustain) {
                    v = this._sustain;
                    this._phase = EnvPhase.SUSTAIN;
                    this._curve = add(1, 1);
                }
                break;
            case EnvPhase.SUSTAIN:
                if (this._curve.next() >= this._speriod) {
                    this.release();
                }
                return this._val;
            case EnvPhase.RELEASE:
                v = this._curve.next();
                if (v < 0) {
                    v = 0;
                    this._phase = EnvPhase.IDLE;
                }
        }
        return (this._val = v * this._gain);
    }

    setAttack(steps: number) {
        this._atime = Math.max(steps, 0);
    }

    setDecay(steps: number) {
        this._dtime = Math.max(steps, 0);
    }

    setRelease(steps: number) {
        this._rtime = Math.max(steps, 0);
    }

    /**
     * Sets sustain level & duration. If the latter is omitted, the
     * current value will be retained.
     *
     * @param level -
     * @param duration -
     */
    setSustain(level: number, duration?: number) {
        this._sustain = clamp01(level);
        duration !== undefined && (this._speriod = duration);
    }

    setCurveA(ratio: number) {
        this._acurve = Math.max(ratio, 1e-9);
    }

    setCurveD(ratio: number) {
        this._dcurve = Math.max(ratio, 1e-9);
    }

    setGain(gain: number) {
        this._gain = gain;
    }
}
