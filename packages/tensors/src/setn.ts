// SPDX-License-Identifier: Apache-2.0
import type { ITensor } from "./api.js";
import { defOpN } from "./defopn.js";
import type { Tensor1, Tensor2, Tensor3, Tensor4 } from "./tensor.js";

const [a, b, c, d, e] = defOpN<any>((x) => x);

export const setN = <T>(out: ITensor<T>, n: T) => a(out, n);

export const setN1 = <T>(out: Tensor1<T>, n: T) => b(out, n);

export const setN2 = <T>(out: Tensor2<T>, n: T) => c(out, n);

export const setN3 = <T>(out: Tensor3<T>, n: T) => d(out, n);

export const setN4 = <T>(out: Tensor4<T>, n: T) => e(out, n);
