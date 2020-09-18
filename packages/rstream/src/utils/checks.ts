import { CloseMode } from "../api";

/**
 * Returns true if mode is FIRST, or if mode is LAST *and* `num = 0`.
 *
 * @internal
 */
export const isFirstOrLastInput = (mode: CloseMode, num: number) =>
    mode === CloseMode.FIRST || (mode === CloseMode.LAST && !num);
