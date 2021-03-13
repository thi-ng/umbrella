import { defError } from "./deferror";

export const OutOfBoundsError = defError<any>(() => "index out of bounds");

export const outOfBounds = (index: number): never => {
    throw new OutOfBoundsError(index);
};

/**
 * Throws an {@link OutOfBoundsError} if `index` outside the `[min..max)` range.
 *
 * @param index
 * @param min
 * @param max
 */
export const ensureIndex = (index: number, min: number, max: number) =>
    (index < min || index >= max) && outOfBounds(index);
