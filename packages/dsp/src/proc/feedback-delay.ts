import { Delay } from "./delay";

export const feedbackDelay = (n: number, fb?: number) =>
    new FeedbackDelay(n, fb);

export class FeedbackDelay extends Delay<number> {
    constructor(n: number, public feedback = 0.5) {
        super(n, 0);
    }

    next(x: number) {
        const d = this._buf[this._rpos];
        this.step();
        x = this._buf[this._wpos] = x + d * this.feedback;
        return x;
    }
}
