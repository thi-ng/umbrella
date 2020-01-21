import { IReset } from "../api";
import { AGen } from "./agen";
import { curve, MAdd } from "./madd";

const enum EnvPhase {
    ATTACK,
    DECAY,
    SUSTAIN,
    RELEASE,
    IDLE
}

/**
 * Time based ADSR envelope gen with customizable exponential attack,
 * decay and release curves.
 *
 * @remarks
 * The `attack`, `decay` and `release` args are to be given in samples
 * (`num = time_in_seconds * sample_rate`). The release phase MUST be
 * triggered manually by calling {@link ADSR.release}. If only attack &
 * decay phases are required, initialize `sustain` to zero and configure
 * `dcurve` to adjust falloff.
 *
 * The envelope can be re-used & restarted by calling
 * {@link ADSR.reset}. This will move the internal state back to the
 * attack phase and start producing a new envelope with current
 * settings. Note: Any changes done to the envelope parameters are only
 * guaranteed to be applied after reset.
 *
 * The `acurve` and `dcurve` args can be used to control the exponential
 * curvature of the attack, decay and release phases. Recommended range
 * [0.0001 - 100] (curved -> linear).
 *
 * @param attack - attack steps (default: 0)
 * @param decay - decay steps (default: 0)
 * @param sustain - sustain level (default: 1)
 * @param release - release steps (default: 0)
 * @param acurve - attack curvature (default: 0.1)
 * @param dcurve - decay / release curvature (default: 0.001)
 */
export const adsr = (
    attack?: number,
    decay?: number,
    sustain?: number,
    release?: number,
    acurve?: number,
    dcurve?: number
) => new ADSR(attack, decay, sustain, release, acurve, dcurve);

export class ADSR extends AGen<number> implements IReset {
    protected _phase!: EnvPhase;
    protected _curve!: MAdd;
    protected _atime!: number;
    protected _dtime!: number;
    protected _rtime!: number;
    protected _acurve!: number;
    protected _dcurve!: number;
    protected _sustain!: number;

    constructor(
        attack = 0,
        decay = 0,
        sustain = 1,
        release = 0,
        acurve = 0.1,
        dcurve = 0.001
    ) {
        super(0);
        this.setAttack(attack);
        this.setDecay(decay);
        this.setRelease(release);
        this.setSustain(sustain);
        this.setCurveA(acurve);
        this.setCurveD(dcurve);
        this.reset();
    }

    reset() {
        this._phase = EnvPhase.ATTACK;
        this._curve = curve(0, 1, this._atime, this._acurve);
        this._val = 0;
    }

    release() {
        if (this._phase < EnvPhase.RELEASE) {
            this._phase = EnvPhase.RELEASE;
            this._curve = curve(this._sustain, 0, this._rtime, this._dcurve);
        }
    }

    isSustained() {
        return this._phase === EnvPhase.SUSTAIN;
    }

    isDone() {
        return this._phase === EnvPhase.IDLE;
    }

    next() {
        let v = this._val;
        switch (this._phase) {
            case EnvPhase.IDLE:
            case EnvPhase.SUSTAIN:
                return v;
            case EnvPhase.ATTACK:
                v = this._curve.next();
                if (v >= 1) {
                    v = 1;
                    this._phase = EnvPhase.DECAY;
                    this._curve = curve(
                        1,
                        this._sustain,
                        this._dtime,
                        this._dcurve
                    );
                }
                break;
            case EnvPhase.DECAY:
                v = this._curve.next();
                if (v <= this._sustain) {
                    v = this._sustain;
                    this._phase = EnvPhase.SUSTAIN;
                }
                break;
            case EnvPhase.RELEASE:
                v = this._curve.next();
                if (v < 0) {
                    v = 0;
                    this._phase = EnvPhase.IDLE;
                }
        }
        return (this._val = v);
    }

    setAttack(rate: number) {
        this._atime = Math.max(rate, 0);
    }

    setDecay(rate: number) {
        this._dtime = Math.max(rate, 0);
    }

    setRelease(rate: number) {
        this._rtime = Math.max(rate, 0);
    }

    setSustain(level: number) {
        this._sustain = level;
    }

    setCurveA(ratio: number) {
        this._acurve = Math.max(ratio, 1e-6);
    }

    setCurveD(ratio: number) {
        this._dcurve = Math.max(ratio, 1e-6);
    }
}
