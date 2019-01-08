import { radix, Stringer } from "@thi.ng/strings";

/**
 * @deprecated use thi.ng/strings `radix()` instead
 *
 * @param digits
 * @param prefix
 */
export const hex = (digits = 2, prefix = ""): Stringer<number> =>
    radix(16, digits, prefix);
