import type { CSSOpts, RuleFn } from "./api.js";
import { formatDecls, indent } from "./impl.js";

export type Keyframe = Record<string, any>;

/**
 * Rule function for `@keyframes`. If a single declaration object is given,
 * it's keys are used as keyframe stops and their values as their declarations
 * objects. This way any number of stops can be specified.
 *
 * @example
 * ```ts
 * css(at_keyframes("fadein", {0: {opacity: 0}, 100: {opacity: 1}}))
 * // @keyframes fadein {
 * //
 * //     0% {
 * //         opacity: 0;
 * //     }
 * //
 * //     100% {
 * //         opacity: 1;
 * //     }
 * //
 * // }
 * ```
 *
 * If called with two objects, the first one provides the declarations for the
 * 0% keyframe and the 2nd for the 100% keyframe.
 *
 * @example
 * ```ts
 * css(at_keyframes("fadein", {opacity: 0}, {opacity: 1}));
 * // @keyframes fadein {
 * //
 * //     0% {
 * //         opacity: 0;
 * //     }
 * //
 * //     100% {
 * //         opacity: 1;
 * //     }
 * //
 * // }
 * ```
 *
 * @param id -
 * @param stops -
 */
export function at_keyframes(id: string, stops: Keyframe): RuleFn;
export function at_keyframes(id: string, from: Keyframe, to: Keyframe): RuleFn;
export function at_keyframes(id: string, ...args: Keyframe[]): RuleFn {
	const stops = args.length === 1 ? args[0] : { 0: args[0], 100: args[1] };
	return (acc: string[], opts: CSSOpts) => {
		const outer = indent(opts);
		opts.depth++;
		const inner = indent(opts);
		acc.push(`${outer}@keyframes ${id}${opts.format.declStart}`);
		for (let s in stops) {
			if (stops.hasOwnProperty(s)) {
				acc.push(
					[
						inner,
						s + "%",
						opts.format.declStart,
						formatDecls(stops[s], opts),
						inner,
						opts.format.declEnd,
					].join("")
				);
			}
		}
		opts.depth--;
		acc.push(outer + opts.format.declEnd);
		return acc;
	};
}
