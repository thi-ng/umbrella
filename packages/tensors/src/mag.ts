// SPDX-License-Identifier: Apache-2.0
import type { ITensor } from "./api.js";
import { magSq } from "./magsq.js";

/**
 * Computes magnitude of given tensor. Also see {@link magSq}.
 *
 * @param a
 */
export const mag = (a: ITensor) => Math.sqrt(magSq(a));
