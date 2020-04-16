import type { NumOrString } from "@thi.ng/api";
import { satisfy } from "./satisfy";

export const range = <T extends NumOrString>(min: T, max: T, id = "lit") =>
    satisfy<T>((x) => x >= min && x <= max, id);

/**
 * Matches single char in given UTF-16 code range.
 *
 * @param min
 * @param max
 * @param id
 */
export const utf16Range = (min: number, max: number, id = "utfLit") =>
    satisfy<string>((x) => {
        const c = x.charCodeAt(0)!;
        return c >= min && c <= max;
    }, id);
