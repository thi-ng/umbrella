import { illegalArity } from "@thi.ng/errors/illegal-arity";
import { range } from "./range.js";

export function range3d(
	toX: number,
	toY: number,
	toZ: number
): IterableIterator<[number, number, number]>;
export function range3d(
	fromX: number,
	toX: number,
	fromY: number,
	toY: number,
	fromZ: number,
	toZ: number
): IterableIterator<[number, number, number]>;
export function range3d(
	fromX: number,
	toX: number,
	fromY: number,
	toY: number,
	fromZ: number,
	toZ: number,
	stepX: number,
	stepY: number,
	stepZ: number
): IterableIterator<[number, number, number]>;
export function* range3d(
	...args: number[]
): IterableIterator<[number, number, number]> {
	let fromX!: number, toX!: number, stepX!: number;
	let fromY!: number, toY!: number, stepY!: number;
	let fromZ!: number, toZ!: number, stepZ!: number;
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
	const rx = range(fromX, toX, stepX);
	const ry = range(fromY, toY, stepY);
	for (let z of range(fromZ, toZ, stepZ)) {
		for (let y of ry) {
			for (let x of rx) {
				yield [x, y, z];
			}
		}
	}
}
