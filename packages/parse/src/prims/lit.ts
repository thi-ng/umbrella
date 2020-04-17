import { discard } from "../combinators/discard";
import { satisfy } from "./satisfy";

/**
 * Matches single char/value `c`.
 *
 * @param c
 * @param id
 */
export const lit = <T>(c: T, id = "lit") => satisfy<T>((x) => x === c, id);

/**
 * Discarded literal. Same as {@link lit}, but result will be discarded.
 *
 * @param c
 */
export const dlit = <T>(c: T) => discard(lit(c));
