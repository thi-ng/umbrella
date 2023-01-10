import { clamp01 } from "@thi.ng/math/interval";
import type { IProc } from "./api.js";
import { Delay } from "./delay.js";

/**
 * Extension of {@link feedbackDelay} with additional filter/proc
 * possibility for the feedback itself (e.g. a low pass filter).
 *
 * @param n - delay length
 * @param filter - IProc applied to feedback
 * @param feedback - feedback factor (default: 0.5)
 */
export const filterFeedbackDelay = (
	n: number,
	filter: IProc<number, number>,
	feedback?: number
) => new FilterFeedbackDelay(n, filter, feedback);

export class FilterFeedbackDelay extends Delay<number> {
	constructor(
		n: number,
		public filter: IProc<number, number>,
		protected _feedback = 0.5
	) {
		super(n, 0);
		this.setFeedback(_feedback);
	}

	next(x: number) {
		return super.next(
			x + this.filter.next(this._buf[this._rpos] * this._feedback)
		);
	}

	feedback() {
		return this._feedback;
	}

	setFeedback(feedback: number) {
		this._feedback = clamp01(feedback);
	}
}
