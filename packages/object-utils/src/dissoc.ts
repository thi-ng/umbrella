// SPDX-License-Identifier: Apache-2.0
import type { IObjectOf } from "@thi.ng/api";

export const dissocObj = <T>(
	obj: IObjectOf<T>,
	keys: Iterable<string | number>
) => {
	for (const k of keys) {
		delete obj[k];
	}
	return obj;
};
