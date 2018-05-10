import { illegalArity } from "@thi.ng/errors/illegal-arity";

import { range } from "./range";

export function range3d(toX: number, toY: number, toZ: number): IterableIterator<[number, number, number]>;
export function range3d(fromX: number, toX: number, fromY: number, toY: number, fromZ: number, toZ: number): IterableIterator<[number, number, number]>;
export function range3d(fromX: number, toX: number, fromY: number, toY: number, fromZ: number, toZ: number, stepX: number, stepY: number, stepZ: number): IterableIterator<[number, number, number]>;
export function* range3d(...args: number[]) {
    let fromX, toX, fromY, toY, fromZ, toZ, stepX, stepY, stepZ;
    switch (args.length) {
        case 9:
            stepX = args[6];
            stepY = args[7];
            stepZ = args[8];
        case 6:
            [fromX, toX, fromY, toY, fromZ, toZ] = args;
            break;
        case 3:
            [toX, toY, toZ] = args;
            fromX = fromY = fromZ = 0;
            break;
        default:
            illegalArity(args.length);
    }
    for (let z of range(fromZ, toZ, stepZ)) {
        for (let y of range(fromY, toY, stepY)) {
            for (let x of range(fromX, toX, stepX)) {
                yield [x, y, z];
            }
        }
    }
}
