// SPDX-License-Identifier: Apache-2.0
import type { ITensor } from "./api.js";
import { defOpT } from "./defopt.js";
import type { Tensor1, Tensor2, Tensor3, Tensor4 } from "./tensor.js";

const [a, b, c, d, e] = defOpT<any>((x) => x);

export const set = <T>(out: ITensor<T>, src: ITensor<T>) => a(out, src);

export const set1 = <T>(out: Tensor1<T>, src: Tensor1<T>) => b(out, src);

export const set2 = <T>(out: Tensor2<T>, src: Tensor2<T>) => c(out, src);

export const set3 = <T>(out: Tensor3<T>, src: Tensor3<T>) => d(out, src);

export const set4 = <T>(out: Tensor4<T>, src: Tensor4<T>) => e(out, src);
