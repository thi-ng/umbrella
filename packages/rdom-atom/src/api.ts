import type { IAtom } from "@thi.ng/atom";
import type { IMountWith } from "@thi.ng/rdom";

/**
 * Specialized version of {@link @thi.ng/rdom#IMountWith} which receives
 * an {@link @thi.ng/atom#IAtom} as state value.
 */
export type IMountWithAtom<T> = IMountWith<T, IAtom<T>>;
