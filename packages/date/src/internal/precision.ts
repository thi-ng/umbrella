import type { Precision } from "../api";

/**
 * Converts a {@link Precision} into a numeric ID.
 *
 * @param prec
 *
 * @internal
 */
export const precisionToID = (prec: Precision) => "yMdhmst".indexOf(prec);

/**
 * Inverse op of {@link precisionToID}.
 *
 * @param id
 *
 * @internal
 */
export const idToPrecision = (id: number) => <Precision>"yMdhmst".charAt(id);
