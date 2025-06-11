// SPDX-License-Identifier: Apache-2.0
import type { ReadonlyVec } from "@thi.ng/vectors";
import { distJaccard } from "@thi.ng/vectors/dist-jaccard";
import { Untransformed } from "./untransformed.js";

/**
 * Jaccard distance metric for n-D vectors. Returns the inverse Jaccard
 * similarity, i.e. as distance metric rather than similarity. Returns a value
 * in `[0,1]` interval: 0.0 if `a` and `b` are equal, or 1.0 if none of the
 * components match.
 */
export const JACCARD = new Untransformed<ReadonlyVec>(distJaccard);
