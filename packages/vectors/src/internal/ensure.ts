import { assert } from "@thi.ng/api";

/**
 * Asserts that `src` has at least 1 item.
 *
 * @internal
 */
export const ensureInputs = (src: any[]) =>
    assert(src.length > 0, `no inputs given`);
