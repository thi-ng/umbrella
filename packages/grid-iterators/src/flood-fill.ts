import type { Predicate } from "@thi.ng/api";
import { BitField, defBitField } from "@thi.ng/bitfield/bitfield";

/**
 * Yields an iterator of 2D coordinates which would flood fill the space in
 * [0,0]..(width,height) interval, starting at given `x,y`. The given predicate
 * function is used to select eligible grid indices (e.g. pixels of sorts)
 *
 * @param pred
 * @param x
 * @param y
 * @param width
 * @param height
 */
export function* floodFill(
    pred: Predicate<number>,
    x: number,
    y: number,
    width: number,
    height: number
) {
    x |= 0;
    y |= 0;
    if (!pred(y * width + x)) return;
    const queue: number[][] = [[x, y]];
    const visited = defBitField(width * height);
    height--;
    while (queue.length) {
        [x, y] = queue.pop()!;
        yield* partialRow(pred, queue, visited, x, y, width, height, -1);
        yield* partialRow(pred, queue, visited, x + 1, y, width, height, 1);
    }
}

/** @internal */
function* partialRow(
    pred: Predicate<number>,
    queue: number[][],
    visited: BitField,
    x: number,
    y: number,
    width: number,
    height1: number,
    dir: number
) {
    let idx = y * width + x;
    if (visited.at(idx)) return;
    let idxUp = idx - width;
    let idxDown = idx + width;
    let scanUp = false;
    let scanDown = false;
    while (x >= 0 && x < width && pred(idx)) {
        visited.setAt(idx);
        yield [x, y];
        if (y > 0) {
            if (pred(idxUp) && !scanUp) {
                queue.push([x, y - 1]);
                scanUp = true;
            } else {
                scanUp = false;
            }
            idxUp += dir;
        }
        if (y < height1) {
            if (pred(idxDown) && !scanDown) {
                queue.push([x, y + 1]);
                scanDown = true;
            } else {
                scanDown = false;
            }
            idxDown += dir;
        }
        x += dir;
        idx += dir;
    }
}
