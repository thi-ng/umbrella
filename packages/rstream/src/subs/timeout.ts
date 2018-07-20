import { State } from "../api"
import { Subscription } from "../subscription";

/**
 * A subscription that emits an error object after a given time.
 *
 * @param timeoutMs Timeout value in milliseconds.
 * @param error An optional error object. Will use a new instance of `Error` by default
 * @param id An optional stream id.
 */
export function timeout<T>(timeoutMs: number, error?: any, id?: string): Subscription<T, T> {
	return new Timeout(timeoutMs, error, id);
}

class Timeout<T> extends Subscription<T, T> {
	private readonly timeoutId: any;

	constructor(timeoutMs: number, error?: any, id?: string) {
		super(undefined, undefined, undefined, id || `timeout-${Subscription.NEXT_ID++}`);

		this.timeoutId = setTimeout(() => {
			if (this.state < State.DONE) {
				this.error(error || new Error(`Timeout stream "${this.id}" after ${timeoutMs} ms`))
			}
		}, timeoutMs);
	}

	cleanup(): void {
		clearTimeout(this.timeoutId);
		super.cleanup();
	}
}

