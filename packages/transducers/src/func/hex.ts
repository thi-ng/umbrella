import { radix } from "@thi.ng/strings/radix";

/**
 * @deprecated use thi.ng/strings `radix()` instead
 *
 * @param digits
 * @param prefix
 */
export const hex = (digits = 2, prefix = ""): (x: number) => string => radix(16, digits, prefix);
