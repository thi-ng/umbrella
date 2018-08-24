import { Stringer } from "@thi.ng/strings/api";
import { radix } from "@thi.ng/strings/radix";

/**
 * @deprecated use thi.ng/strings `radix()` instead
 *
 * @param digits
 * @param prefix
 */
export const hex = (digits = 2, prefix = ""): Stringer<number> =>
    radix(16, digits, prefix);
