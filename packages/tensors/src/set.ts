// SPDX-License-Identifier: Apache-2.0
import type { ITensor } from "./api.js";
import { defOpT } from "./defopt.js";

const $op = defOpT<any>((x) => x);

export const set = <T>(out: ITensor<T>, src: ITensor<T>) => $op(out, src);
