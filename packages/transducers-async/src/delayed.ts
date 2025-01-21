// SPDX-License-Identifier: Apache-2.0
import { delayed as $ } from "@thi.ng/compose/delayed";

/**
 * Same as [thi.ng/compose `delayed()`](). Re-exported for convenience. Yields
 * `x` as promise which only resolves after `delay` milliseconds.
 *
 * @remarks
 * Also see {@link wait}.
 *
 * @param x
 * @param delay
 */
export const delayed = $;

/**
 * Syntax sugar for {@link delayed}, yields a void promise which resolves after
 * `delay` milliseconds.
 *
 * @remarks
 * Also see {@link delayed}.
 *
 * @param delay
 */
export const wait = (delay: number) => delayed<void>(undefined, delay);
