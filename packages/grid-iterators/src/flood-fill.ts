import type { Predicate2 } from "@thi.ng/api";
import { BitField, defBitField } from "@thi.ng/bitfield/bitfield";

/**
 * Yields an iterator of 2D coordinates of the connected region around `x,y` for
 * which the given predicate succeeds. I.e. The function recursively explores
 * (in a row-major manner) the space in the `[0,0]..(width,height)` interval,
 * starting at given `x,y` and continues as long given predicate function
 * returns a truthy value.
 *
 * @remarks
 * Only the behavior is recursive, not the actual implementation (stack based).
 * Grid cells are visited max. once. A bit field is used to mark visited cells.
 *
 * @example
 * ```ts
 * import { floodFill } from "@thi.ng/grid-iterators";
 *
 * const img = [
 *   1,0,1,0,
 *   0,0,0,0,
 *   0,1,1,0,
 *   0,1,1,1,
 * ];
 *
 * // flood fill connected region from point (2,1)
 * [...floodFill((x, y) => img[y * 4 + x] === 0, 2, 1, 4, 4)]
 * // [
 * //   [2, 1], [1, 1], [0, 1], [3, 1], [3, 2],
 * //   [3, 0], [0, 2], [0, 3], [1, 0]
 * // ]
 * ```
 *
 * @param pred -
 * @param x -
 * @param y -
 * @param width -
 * @param height -
 */
export function* floodFill(
	pred: Predicate2<number>,
	x: number,
	y: number,
	width: number,
	height: number
) {
	x |= 0;
	y |= 0;
	if (!pred(x, y)) return;
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
	pred: Predicate2<number>,
	queue: number[][],
	visited: BitField,
	x: number,
	y: number,
	width: number,
	height1: number,
	step: number
) {
	let idx = y * width + x;
	if (visited.at(idx)) return;
	let scanUp = false;
	let scanDown = false;
	while (x >= 0 && x < width && pred(x, y)) {
		visited.setAt(idx);
		yield [x, y];
		if (y > 0) {
			if (pred(x, y - 1) && !scanUp) {
				queue.push([x, y - 1]);
				scanUp = true;
			} else {
				scanUp = false;
			}
		}
		if (y < height1) {
			if (pred(x, y + 1) && !scanDown) {
				queue.push([x, y + 1]);
				scanDown = true;
			} else {
				scanDown = false;
			}
		}
		x += step;
		idx += step;
	}
}
