import { isNumber } from "@thi.ng/checks/is-number";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { cossin } from "@thi.ng/math/angle";
import { mix } from "@thi.ng/math/mix";
import type { ReadonlyVec } from "@thi.ng/vectors/api";
import { jitter } from "@thi.ng/vectors/jitter";
import { madd2 } from "@thi.ng/vectors/madd";
import { maddN2 } from "@thi.ng/vectors/maddn";
import { MOVE } from "./commands.js";
import { dip, type DipOpts } from "./dip.js";

export interface BasePaletteOpts extends Partial<DipOpts> {
	/**
	 * Jitter radius for base position.
	 *
	 * @defaultValue 0
	 */
	jitter?: number;
	/**
	 * Number of palette slots.
	 */
	num: number;
	/**
	 * Number of brush dips to execute.
	 *
	 * @defaultValue 1
	 */
	repeat?: number;
}

export interface LinearPaletteOpts extends BasePaletteOpts {
	/**
	 * Palette's base position (in world space units). See {@link AxiDrawOpts.unitsPerInch}.
	 *
	 * @defaultValue [0, 0]
	 */
	pos?: ReadonlyVec;
	/**
	 * Step direction vector between palette slots.
	 */
	step: ReadonlyVec;
}

export interface RadialPaletteOpts extends BasePaletteOpts {
	/**
	 * Palette's center position (in world space units). See {@link AxiDrawOpts.unitsPerInch}.
	 */
	pos: ReadonlyVec;
	/**
	 * Palette radius (measured to the center of each palette slot). If
	 * circular, given as number. If elliptical, given as vector.
	 */
	radius: number | ReadonlyVec;
	/**
	 * Start angle (in radians).
	 *
	 * @defaultValue 0
	 */
	startTheta?: number;
	/**
	 * End angle (in radians). This is 2π for a full-circle palette.
	 */
	endTheta?: number;
}

/**
 * Higher order {@link DrawCommand} sequence generator for working with paint
 * brushes. Takes an config object describing a linear paint palette layout and
 * behavior options for dipping the brush. Returns a function which takes a
 * palette slot index as argument and returns a command sequence moving the
 * plotter to the palette slot and dipping the brush to refill.
 *
 * @remarks
 * Can be used with
 * [InterleaveOpts](https://docs.thi.ng/umbrella/geom-axidraw/interfaces/InterleaveOpts.html)
 * of https://thi.ng/geom-axidraw.
 *
 * Also see:
 * - {@link LinearPaletteOpts} for options
 * - {@link radialPalette} for circular/elliptical palette layouts
 * - {@link dip} (used internally for dipping sequence)
 *
 * @example
 * ```ts
 * import { points } from "@thi.ng/geom";
 * import { asAxiDraw } from "@thi.ng/geom-axidraw";
 * import { repeatedly } from "@thi.ng/transducers";
 * import { randMinMax2 } from "@thi.ng/vectors";
 *
 * // configure palette
 * const palette = linearPalette({
 *   // first palette slot is near the world origin (slight offset)
 *   pos: [2, 0],
 *   // palette has 5 paint slots
 *   num: 5,
 *   // each slot 40mm separation along Y-axis
 *   // (needs to be measured/determined manually)
 *   step: [0, 40],
 *   // 2mm jitter radius (to not always move to exact same position)
 *   jitter: 2,
 *   // dip brush 3x each time
 *   repeat: 3,
 * });
 *
 * // investigate command sequence for requesting slot #1
 * palette(1)
 * // [
 * //   [ "M", [ 0.8949, 41.6697 ], 1 ],
 * //   [ "d", undefined, undefined ],
 * //   [ "u", undefined, undefined ],
 * //   [ "d", undefined, undefined ],
 * //   [ "u", undefined, undefined ],
 * //   [ "d", undefined, undefined ],
 * //   [ "u", undefined, undefined ]
 * // ]
 *
 * // define point cloud of 100 random points
 * // using a random palette slot each time (for each refill)
 * // assign axidraw-specific attribs to refill brush every 10 dots
 * const cloud = points(
 *   [...repeatedly(() => randMinMax2([], [10, 10], [190, 190]), 100)],
 *   {
 *     __axi: {
 *       interleave: {
 *         num: 10,
 *         commands: () => palette((Math.random() * 5) | 0)
 *       }
 *     }
 *   }
 * );
 *
 * // AxiDraw setup
 * const axi = new AxiDraw();
 * ...
 *
 * // convert geometry into axidraw commands and send to plotter
 * axi.draw(asAxiDraw(cloud));
 * ```
 *
 * @param opts
 */
export const linearPalette = (opts: LinearPaletteOpts) => {
	const $opts = {
		pos: [0, 0],
		repeat: 1,
		jitter: 0,
		...opts,
	};
	const dipOpts = __dipOpts($opts);
	return (id: number) => {
		if (id < 0 || id >= $opts.num) {
			illegalArgs(`invalid palette index: ${id}`);
		}
		return [
			MOVE(
				jitter(
					null,
					maddN2([], $opts.step, id, $opts.pos),
					$opts.jitter
				)
			),
			...dip($opts.repeat, dipOpts),
		];
	};
};

/**
 * Higher order {@link DrawCommand} sequence generator for working with paint
 * brushes. Similar to {@link linearPalette}, but for circular or elliptic
 * palette layouts.
 *
 * @remarks
 * Also see:
 * - {@link RadialPaletteOpts} for options
 * - {@link linearPalette} for more details & code example
 * - {@link dip} (used internally for dipping sequence)
 *
 * @param opts
 */
export const radialPalette = (opts: RadialPaletteOpts) => {
	const $opts = {
		repeat: 1,
		jitter: 0,
		startTheta: 0,
		endTheta: Math.PI * 2,
		...opts,
	};
	const radius = isNumber($opts.radius)
		? [$opts.radius, $opts.radius]
		: $opts.radius;
	const dipOpts = __dipOpts($opts);
	return (id: number) => {
		if (id < 0 || id >= $opts.num) {
			illegalArgs(`invalid palette index: ${id}`);
		}
		return [
			MOVE(
				jitter(
					null,
					madd2(
						null,
						cossin(
							mix(
								$opts.startTheta,
								$opts.endTheta,
								id / $opts.num
							)
						),
						radius,
						$opts.pos
					),
					$opts.jitter
				)
			),
			...dip($opts.repeat, dipOpts),
		];
	};
};

const __dipOpts = (opts: BasePaletteOpts): Partial<DipOpts> => ({
	down: opts.down,
	downDelay: opts.downDelay,
	up: opts.up,
	upDelay: opts.upDelay,
	commands: opts.commands,
});
