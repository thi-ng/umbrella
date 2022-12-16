import { uuid as $uuid } from "@thi.ng/hex";

/**
 * Same as [`uuid()`](https://docs.thi.ng/umbrella/hex/functions/uuid.html).
 * Returns UUID formatted string of given byte array from optional start index
 * `i` (default: 0). Array must have min. length
 * 16.
 *
 * @remarks
 * Use [`uuid()`](https://docs.thi.ng/umbrella/random/functions/uuid.html) to
 * also generate an UUID from scratch (rather than just format one).
 *
 * @param id -
 * @param i -
 */
export const uuid = $uuid;
