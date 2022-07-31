import type { Fn0, IDeref } from "@thi.ng/api";

export const delay = <T>(body: Fn0<T>) => new Delay<T>(body);

export class Delay<T> implements IDeref<T> {
	protected value!: T;
	protected body: Fn0<T>;
	protected realized: boolean;

	constructor(body: Fn0<T>) {
		this.body = body;
		this.realized = false;
	}

	deref() {
		if (!this.realized) {
			this.value = this.body();
			this.realized = true;
		}
		return this.value;
	}

	isRealized() {
		return this.realized;
	}
}
