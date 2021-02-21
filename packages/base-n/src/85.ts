import { B62_CHARS } from "./62";
import { defBase } from "./base";

const B85_CHARS = B62_CHARS + "!#$%&()*+-;<=>?@^_`{|}~";

/**
 * Reference: https://en.wikipedia.org/wiki/Ascii85
 */
export const BASE85 = defBase(B85_CHARS);
