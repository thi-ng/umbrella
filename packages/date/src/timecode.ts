// SPDX-License-Identifier: Apache-2.0
import { Z2, Z3, Z4 } from "@thi.ng/strings/pad-left";
import { decomposeDuration } from "./duration.js";

/**
 * Options for {@link defTimecode}.
 */
export interface TimecodeOpts {
	/**
	 * Timecode part separators in the following order: day, hour, minute,
	 * second. By default uses `:` for all.
	 */
	sep: ArrayLike<string>;
	/**
	 * If true (default: false), the day timecode part will always be included
	 * in output. If false, only if the value is non-zero.
	 */
	day: boolean;
	/**
	 * If true (default), the hour timecode part will always be included in
	 * output. If false, only if the value is non-zero (or if day is used).
	 */
	hour: boolean;
	/**
	 * If true (default), frame timecode part will be included.
	 */
	frame: boolean;
}

/**
 * Returns a time formatter for given `fps` (frames per second, in `[1,1000]`
 * range), e.g. `HH:mm:ss:ff`. The returned function takes a single arg (time in
 * milliseconds) and returns a formatted string.
 *
 * @remarks
 * The timecode considers days too, but by default only includes them in the
 * result if the day part is non-zero. The 4 separators between each field can
 * be customized via the {@link TimecodeOpts.sep} option.
 *
 * The minute and second parts are the only ones which will always be present.
 * The visibility of others can be configured.
 *
 * Depending on FPS, the frame part will be between 2-4 digits (zero-padded).
 *
 * @example
 * ```ts tangle:../export/timecode.ts
 * import { defTimecode, DAY, HOUR, MINUTE, SECOND } from "@thi.ng/date";
 *
 * // use 30 fps w/ default options
 * const fmt = defTimecode(30);
 *
 * // day part omitted by default if zero
 * console.log(
 *   fmt(HOUR + 2*MINUTE + 3*SECOND + 4*SECOND/30)
 * );
 * // 01:02:03:04
 *
 * // ...but shown if needed
 * console.log(fmt(DAY));
 * // 01:00:00:00:00
 *
 * // use custom seperators
 * const fmt2 = defTimecode(30, { sep: ["d ", "h ", "' ", '" '] });
 *
 * console.log(
 *   fmt2(DAY + 2*HOUR + 3*MINUTE + 4*SECOND + 999)
 * );
 * // 01d 02h 03' 04" 29
 *
 * // only use `min:sec`
 * const fmt3 = defTimecode(30, { hour: false, frames: false });
 *
 * console.log(
 *   fmt3(12 * MINUTE + 34 * SECOND)
 * );
 * // 12:34
 * ```
 *
 * @param fps -
 * @param opts -
 */
export const defTimecode = (fps: number, opts: Partial<TimecodeOpts> = {}) => {
	const {
		sep = "::::",
		day = false,
		hour = true,
		frame: useFrame = true,
	} = opts;
	const frame = 1000 / fps;
	const $sep = (x: number) => sep[x] ?? ":";
	const fmtFrame = fps < 100 ? Z2 : fps < 1000 ? Z3 : Z4;
	return (t: number) => {
		const [_, __, d, h, m, s, ms] = decomposeDuration(t);
		let parts = "";
		if (d || day) parts += Z2(d) + $sep(0);
		if (h || d || day || hour) parts += Z2(h) + $sep(1);
		parts += Z2(m) + $sep(2) + Z2(s);
		if (useFrame) parts += $sep(3) + fmtFrame((ms / frame) | 0);
		return parts;
	};
};
