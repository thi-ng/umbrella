import { B62_CHARS } from "./62.js";
import { defBase } from "./base.js";

export const B83_CHARS = B62_CHARS + "#$%*+,-.:;=?@[]^_{|}~";

/**
 * Reference: https://github.com/woltapp/blurhash/blob/master/Algorithm.md#base-83
 */
export const BASE83 = defBase(B83_CHARS);
