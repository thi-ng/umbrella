// SPDX-License-Identifier: Apache-2.0
import type { Fn3, TypedArray } from "@thi.ng/api";

export type AnyArray = any[] | TypedArray;

export type SwapFn = Fn3<AnyArray, number, number, void>;
