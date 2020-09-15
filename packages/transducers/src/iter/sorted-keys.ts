import type { Comparator } from "@thi.ng/api";
import { compare } from "@thi.ng/compare";

/**
 * Syntax sugar for `Object.keys(x).sort()` with support for custom
 * comparator (default: {@link @thi.ng/compare#compare}) and yielding
 * iterator of sorted keys.
 *
 * @param x -
 * @param cmp -
 */
export function* sortedKeys(x: any, cmp: Comparator<string> = compare) {
    yield* Object.keys(x).sort(cmp);
}
