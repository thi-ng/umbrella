import { range } from "./range";

export function range3d(fromX: number, toX: number, fromY: number, toY: number, fromZ: number, toZ: number): IterableIterator<[number, number, number]>;
export function range3d(fromX: number, toX: number, fromY: number, toY: number, fromZ: number, toZ: number, stepX: number, stepY: number, stepZ: number): IterableIterator<[number, number, number]>;
export function* range3d(...args: number[]) {
    let [fromX, toX, fromY, toY, fromZ, toZ] = args;
    let stepX, stepY, stepZ;
    switch (args.length) {
        case 6:
            break;
        case 9:
            stepX = args[6];
            stepY = args[7];
            stepZ = args[8];
            break;
        default:
            throw new Error(`invalid arity: ${args.length}`);
    }
    for (let z of range(fromZ, toZ, stepZ)) {
        for (let y of range(fromY, toY, stepY)) {
            for (let x of range(fromX, toX, stepX)) {
                yield [x, y, z];
            }
        }
    }
}
