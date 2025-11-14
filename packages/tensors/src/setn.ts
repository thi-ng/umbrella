// SPDX-License-Identifier: Apache-2.0
import type { ITensor } from "./api.js";
import { defOpN } from "./defopn.js";

const $op = defOpN<any>((x) => x);

export const setN = <T, TA extends ITensor<T>>(out: TA, n: T): TA =>
	<any>$op(out, n);
