import type { FnU } from "@thi.ng/api";

/**
 * UTF-8 Byte Order Mark character
 * https://en.wikipedia.org/wiki/Byte_order_mark
 */
export const BOM = "\ufeff";

export type Stringer<T> = (x: T, ...xs: any[]) => string;

export type FnS = FnU<string>;
