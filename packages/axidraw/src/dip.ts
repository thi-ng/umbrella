import type { Fn0 } from "@thi.ng/api";
import { flatten1 } from "@thi.ng/transducers/flatten1";
import { repeatedly } from "@thi.ng/transducers/repeatedly";
import type { DrawCommand } from "./api.js";
import { DOWN, UP } from "./commands.js";

export interface DipOpts {
	/**
	 * Delay for emitted {@link DOWN} commands. If omitted, uses globally
	 * configured default.
	 */
	up: number;
	/**
	 * Delay for emitted {@link UP} commands. If omitted, uses globally
	 * configured default.
	 */
	down: number;
	/**
	 * No-arg function to inject custom commands between each down - up command.
	 * See example in {@link DIP} docs.
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
 * ```ts
 * // simple 2x up/down
 * [...DIP(2)]
 * // [
 * //   [ "d", undefined ],
 * //   [ "u", undefined ],
 * //   [ "d", undefined ],
 * //   [ "u", undefined ],
 * // ]
 *
 * // 3x dipping with custom up/down delays, each time at a random position
 * [...DIP(3, {
 *   down: 300,
 *   up: 400,
 *   commands: () => [ MOVE([Math.random()* 5, Math.random()* 5]) ]
 * })]
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
export const dip = (n: number, opts: Partial<DipOpts> = {}) =>
	flatten1<DrawCommand>(
		repeatedly(
			opts.commands
				? () => [DOWN(opts.down), ...opts.commands!(), UP(opts.up)]
				: () => [DOWN(opts.down), UP(opts.up)],
			n
		)
	);
