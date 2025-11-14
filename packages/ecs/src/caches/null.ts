// SPDX-License-Identifier: Apache-2.0
import type { Fn0, Maybe } from "@thi.ng/api";
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

	get(_: number): Maybe<T> {
		return;
	}

	getSet(_: number, notFound: Fn0<T>): T {
		return notFound();
	}

	delete(_: number): boolean {
		return true;
	}
}
