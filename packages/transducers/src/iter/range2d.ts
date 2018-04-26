import { illegalArity } from "@thi.ng/api/error";

import { range } from "./range";

export function range2d(toX: number, toY: number): IterableIterator<[number, number]>;
export function range2d(fromX: number, toX: number, fromY: number, toY: number): IterableIterator<[number, number]>;
export function range2d(fromX: number, toX: number, fromY: number, toY: number, stepX: number, stepY: number): IterableIterator<[number, number]>;
export function* range2d(...args: number[]) {
    let fromX, toX, fromY, toY, stepX, stepY;
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
    for (let y of range(fromY, toY, stepY)) {
        for (let x of range(fromX, toX, stepX)) {
            yield [x, y];
        }
    }
}
