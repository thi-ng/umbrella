import { range } from "./range";

export function range2d(fromX: number, toX: number, fromY: number, toY: number): IterableIterator<[number, number]>;
export function range2d(fromX: number, toX: number, fromY: number, toY: number, stepX: number, stepY: number): IterableIterator<[number, number]>;
export function* range2d(...args: number[]) {
    let [fromX, toX, fromY, toY] = args;
    let stepX, stepY;
    switch (args.length) {
        case 4:
            break;
        case 6:
            stepX = args[4];
            stepY = args[5];
            break;
        default:
            throw new Error(`invalid arity: ${args.length}`);
    }
    for (let y of range(fromY, toY, stepY)) {
        for (let x of range(fromX, toX, stepX)) {
            yield [x, y];
        }
    }
}
