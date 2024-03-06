import type { Fn0 } from "@thi.ng/api";
import { flatten1 } from "@thi.ng/transducers/flatten1";
import { repeatedly } from "@thi.ng/transducers/repeatedly";
import type { DrawCommand } from "./api.js";
import { DOWN, RESTORE, SAVE, UP } from "./commands.js";

export interface DipOpts {
	/**
	 * Pen level (0-99) for emitted {@link UP} commands. If omitted, uses
	 * currently configured default.
	 */
	up: number;
	/**
	 * Delay for emitted {@link DOWN} commands. If omitted, uses currently
	 * configured default.
	 */
	upDelay: number;
	/**
	 * Pen level (0-99) for emitted {@link DOWN} commands. If omitted, uses
	 * currently configured default.
	 */
	down: number;
	/**
	 * Delay for emitted {@link UP} commands. If omitted, uses currently
	 * configured default.
	 */
	downDelay: number;
	/**
	 * No-arg function to inject custom commands between each down - up command.
	 * See example in {@link dip} docs.
	 */
	commands: Fn0<Iterable<DrawCommand>>;
}

/**
 * Yields a **sequence** of `n` repetitions of {@link DOWN}, {@link UP}
 * commands, optionally interspersed with other user provided
 * {@link DrawCommand}s, e.g. for dipping & moving a brush a few times into a
 * paint reservoir to refill.
 *
 * @example
 * ```ts tangle:../export/dip.ts
 * import { dip, MOVE } from "@thi.ng/axidraw";
 *
 * // simple 2x up/down
 * console.log([...dip(2)]);
 * // [
 * //   [ "d", undefined ],
 * //   [ "u", undefined ],
 * //   [ "d", undefined ],
 * //   [ "u", undefined ],
 * // ]
 *
 * // 3x dipping with custom up/down delays, each time at a random position
 * console.log(
 *   [...dip(3, {
 *     down: 300,
 *     up: 400,
 *     commands: () => [ MOVE([Math.random()* 5, Math.random()* 5]) ]
 *   })]
 * );
 * // [
 * //   [ "d", 300 ],
 * //   [ "M", [ 3.996, 1.707 ], 1 ],
 * //   [ "u", 400 ],
 * //   [ "d", 300 ],
 * //   [ "M", [ 4.747, 4.925 ], 1 ],
 * //   [ "u", 400 ],
 * //   [ "d", 300 ],
 * //   [ "M", [ 1.751, 0.670 ], 1 ],
 * //   [ "u", 400 ]
 * // ]
 * ```
 *
 * @param n
 * @param opts
 */
export const dip = (
	n: number,
	opts: Partial<DipOpts> = {}
): Iterable<DrawCommand> => {
	const down = DOWN(opts.downDelay, opts.down);
	const up = UP(opts.upDelay, opts.up);
	const main = flatten1<DrawCommand>(
		repeatedly(
			opts.commands
				? () => [down, ...opts.commands!(), up]
				: () => [down, up],
			n
		)
	);
	return opts.down !== undefined || opts.up !== undefined
		? [SAVE, ...main, RESTORE]
		: main;
};
