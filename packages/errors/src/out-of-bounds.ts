import { defError } from "./deferror";

export const OutOfBoundsError = defError<any>(() => "index out of bounds");

export const outOfBounds = (index: any): never => {
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

/**
 * Throws an {@link OutOfBoundsError} if either `x` or `y` is outside their
 * respective `[0..max)` range.
 *
 * @param x
 * @param y
 * @param maxX
 * @param maxY
 * @returns
 */
export const ensureIndex2 = (
    x: number,
    y: number,
    maxX: number,
    maxY: number
) => (x < 0 || x >= maxX || y < 0 || y >= maxY) && outOfBounds([x, y]);
