import type { Precision } from "../api";

/**
 * Converts a {@link Precision} into a numeric ID.
 *
 * @param prec
 *
 * @internal
 */
export const __precisionToID = (prec: Precision) => "yMdhmst".indexOf(prec);

/**
 * Inverse op of {@link __precisionToID}.
 *
 * @param id
 *
 * @internal
 */
export const __idToPrecision = (id: number) => <Precision>"yMdhmst".charAt(id);
