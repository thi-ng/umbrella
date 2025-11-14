// SPDX-License-Identifier: Apache-2.0
import type { ReadonlyVec } from "@thi.ng/vectors";
import { dist, dist2, dist3 } from "@thi.ng/vectors/dist";
import { Untransformed } from "./untransformed.js";

/**
 * Eucledian distance metric for n-D vectors.
 */
export const EUCLEDIAN = new Untransformed<ReadonlyVec>(dist);

/**
 * Eucledian distance metric for numbers.
 */
export const EUCLEDIAN1 = new Untransformed<number>((a, b) => Math.abs(a - b));

/**
 * Eucledian distance metric for 2d vectors.
 */
export const EUCLEDIAN2 = new Untransformed<ReadonlyVec>(dist2);

/**
 * Eucledian distance metric for 3d vectors.
 */
export const EUCLEDIAN3 = new Untransformed<ReadonlyVec>(dist3);
