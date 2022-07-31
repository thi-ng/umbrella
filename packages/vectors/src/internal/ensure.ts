import { assert } from "@thi.ng/errors/assert";

/**
 * Asserts that `src` has at least 1 item.
 *
 * @internal
 */
export const __ensureInputs = (src: any[]) =>
	assert(src.length > 0, `no inputs given`);
