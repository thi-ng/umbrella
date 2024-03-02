import { mergeAttribs } from "./utils/merge-attribs.js";
import type { IObjectOf } from "@thi.ng/api";
import type { Button, ButtonArgs } from "./button.js";

/**
 * Button group component config options.
 */
export interface ButtonGroupOpts {
	/**
	 * Pre-configured stateless button component function for first
	 * button in group. MUST be provided.
	 */
	first: Button;
	/**
	 * Pre-configured stateless button component function for inner
	 * buttons in group. Only used if at least 3 buttons in group.
	 * If not specified, `first` will be used.
	 */
	inner?: Button;
	/**
	 * Pre-configured stateless button component function for last
	 * button in group. If not specified, `first` will be used.
	 */
	last?: Button;
	/**
	 * Attribs for button group container.
	 */
	attribs?: IObjectOf<any>;
}

export interface ButtonGroupArgs {
	/**
	 * User supplied attribute overrides.
	 */
	attribs: IObjectOf<any>;
	/**
	 * Disabled flag for entire button group.
	 * Default: none
	 */
	disabled: boolean;
}

/**
 * Argument type for a single button in the group, e.g.
 *
 * ```ts
 * [{onclick: () => alert("foo") }, ["i.fas.fa-check"], "foo"]
 * ```
 */
export interface ButtonGroupItem extends Array<any> {
	[0]: ButtonArgs;
	[id: number]: any;
}

export type ButtonGroup = (
	_: any,
	args: ButtonGroupArgs,
	...buttons: ButtonGroupItem[]
) => any;

/**
 * Higher order function to create a new stateless button group
 * component, pre-configured via user supplied options. The returned
 * component function accepts the following arguments:
 *
 * - hdom context object (unused)
 * - partial {@link ButtonGroupArgs} object (extra attribs, disabled flag)
 * - button group items (varargs)
 *
 * Any `attribs` provided as arg via {@link ButtonGroupArgs} are merged with
 * the default options provided to the HOF. If `disabled` is true, ALL
 * buttons in the group will be disabled, regardless of their individual
 * settings. The group can have any number of elements, given as
 * varargs.
 *
 * @param opts -
 */
export const buttonGroup =
	(opts: ButtonGroupOpts): ButtonGroup =>
	(_, args: ButtonGroupArgs, ...buttons: ButtonGroupItem[]) =>
		[
			"div",
			mergeAttribs(opts.attribs, args.attribs),
			...groupBody(opts, args.disabled, buttons),
		];

const groupBody = (
	opts: ButtonGroupOpts,
	disabled: boolean,
	buttons: ButtonGroupItem[]
) => {
	switch (buttons.length) {
		case 0:
			return [];
		case 1:
			return [bt(opts.inner || opts.first, disabled, buttons[0])];
		case 2:
			return [
				bt(opts.first, disabled, buttons[0]),
				bt(opts.last || opts.first, disabled, buttons[1]),
			];
		default: {
			const res = [bt(opts.first, disabled, buttons[0])];
			const el = opts.inner || opts.first;
			const n = buttons.length - 1;
			for (let i = 1; i < n; i++) {
				res[i] = bt(el, disabled, buttons[i]);
			}
			res[n] = bt(opts.last || opts.first, disabled, buttons[n]);
			return res;
		}
	}
};

const bt = (el: Button, disabled: boolean, bt: ButtonGroupItem) =>
	disabled ? [el, { ...bt[0], disabled: true }, ...bt.slice(1)] : [el, ...bt];
