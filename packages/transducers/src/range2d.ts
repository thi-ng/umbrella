import { illegalArity } from "@thi.ng/errors/illegal-arity";
import { range } from "./range.js";

export function range2d(
    toX: number,
    toY: number
): IterableIterator<[number, number]>;
export function range2d(
    fromX: number,
    toX: number,
    fromY: number,
    toY: number
): IterableIterator<[number, number]>;
export function range2d(
    fromX: number,
    toX: number,
    fromY: number,
    toY: number,
    stepX: number,
    stepY: number
): IterableIterator<[number, number]>;
export function* range2d(
    ...args: number[]
): IterableIterator<[number, number]> {
    let fromX!: number, toX!: number, stepX!: number;
    let fromY!: number, toY!: number, stepY!: number;
    switch (args.length) {
        case 6:
            stepX = args[4];
            stepY = args[5];
        case 4:
            [fromX, toX, fromY, toY] = args;
            break;
        case 2:
            [toX, toY] = args;
            fromX = fromY = 0;
            break;
        default:
            illegalArity(args.length);
    }
    const rx = range(fromX, toX, stepX);
    for (let y of range(fromY, toY, stepY)) {
        for (let x of rx) {
            yield [x, y];
        }
    }
}
