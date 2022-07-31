import { clamp01 } from "@thi.ng/math/interval";
import { Delay } from "./delay.js";

/**
 * Extension of {@link Delay} which adds sum delayed value multiplied
 * with `feedback` for each new input.
 *
 * @param n - delay length
 * @param feedback - feedback factor (default: 0.5)
 */
export const feedbackDelay = (n: number, feedback?: number) =>
	new FeedbackDelay(n, feedback);

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
