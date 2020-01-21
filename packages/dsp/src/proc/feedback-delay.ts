import { clamp01 } from "@thi.ng/math";
import { Delay } from "./delay";

export const feedbackDelay = (n: number, fb?: number) =>
    new FeedbackDelay(n, fb);

export class FeedbackDelay extends Delay<number> {
    constructor(n: number, protected _feedback = 0.5) {
        super(n, 0);
        this.setFeedback(_feedback);
    }

    next(x: number) {
        return super.next(x + this._buf[this._rpos] * this._feedback);
    }

    feedback() {
        return this._feedback;
    }

    setFeedback(feedback: number) {
        this._feedback = clamp01(feedback);
    }
}
