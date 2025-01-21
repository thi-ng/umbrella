// SPDX-License-Identifier: Apache-2.0
import { __hadd2_f32, __hadd4_f32 } from "./hadd";

// @ts-ignore: decorator
@inline
export function __magsq2(v: v128): v128 {
    return __hadd2_f32(f32x4.mul(v, v));
}

// @ts-ignore: decorator
@inline
export function __magsq4(v: v128): f32 {
    return __hadd4_f32(f32x4.mul(v, v));
}
