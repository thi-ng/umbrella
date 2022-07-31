import type { Fn0 } from "@thi.ng/api";
import type { ICache } from "../api.js";

export class NullCache<T> implements ICache<T> {
	clear() {}

	release() {
		return true;
	}

	*keys() {}

	set(_: number, val: T): T {
		return val;
	}

	get(_: number): T | undefined {
		return;
	}

	getSet(_: number, notFound: Fn0<T>): T {
		return notFound();
	}

	delete(_: number): boolean {
		return true;
	}
}
