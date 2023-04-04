import type { Fn } from "@thi.ng/api";
import { option, select, type SelectAttribs } from "@thi.ng/hiccup-html/forms";
import { $input } from "@thi.ng/rdom/event";
import { $list } from "@thi.ng/rdom/list";
import { $replace } from "@thi.ng/rdom/replace";
import type { ISubscribable, ISubscription } from "@thi.ng/rstream";

export interface DropdownOpts<T> {
	attribs: Partial<SelectAttribs>;
	label: Fn<T, string>;
	value: Fn<T, string>;
}

/**
 * Dropdown `<select>` component with dynamically defined list of items (via
 * subscription) and reactive updates using additionally provided `sel`
 * subscription.
 *
 * @remarks
 * Only single selections are supported. Each generated `<option>` element will
 * have its own child subscription to update its `selected` attribute based on
 * current value of `sel`.
 *
 * See {@link staticDropdown} or {@link staticDropdownAlt} for use cases where
 * the items themselves are statically defined.
 *
 * @param items
 * @param sel
 * @param opts
 */
export const dynamicDropdown = <T = string, S extends string = string>(
	items: ISubscribable<T[]>,
	sel: ISubscription<S, S>,
	opts?: Partial<DropdownOpts<T>>
) => {
	opts = {
		value: String,
		label: String,
		...opts,
	};
	return $list<T>(
		items,
		"select",
		{ onchange: $input(sel), ...opts!.attribs },
		$option(sel, <Required<DropdownOpts<T>>>opts)
	);
};

/**
 * Dropdown `<select>` component with statically defined list of items, but
 * reactive updates using provided `sel` subscription.
 *
 * @remarks
 * Only single selections are supported. Each generated `<option>` element will
 * have its own child subscription to update its `selected` attribute based on
 * current value of `sel`.
 *
 * See {@link staticDropdownAlt} for alternative approach or
 * {@link dynamicDropdown} for use cases where the items themselves are
 * dynamically changeable.
 *
 * @param items
 * @param sel
 * @param opts
 * @returns
 */
export const staticDropdown = <T = string, S extends string = string>(
	items: T[],
	sel: ISubscription<S, S>,
	opts?: Partial<DropdownOpts<T>>
) => {
	opts = {
		value: String,
		label: String,
		...opts,
	};
	return select(
		{ onchange: $input(sel), ...opts.attribs },
		...items.map($option(sel, <Required<DropdownOpts<T>>>opts))
	);
};

/**
 * Similar to {@link staticDropdown}, but using only a single subscription for
 * the entire dropdown.
 *
 * @remarks
 * **IMPORTANT:** This component is replacing its entire `<select>` element (and
 * all its children) with each value change of `sel`. The component will only be
 * fully mounted when `sel` produces a non-null value. In other words, `sel`
 * **MUST** be pre-initialized for the component to show up (e.g. using
 * rstream's
 * [`reactive`](https://docs.thi.ng/umbrella/rstream/functions/reactive.html)
 * with a seed value).
 *
 * Internally uses thi.ng/rdom
 * [`$replace()`](https://docs.thi.ng/umbrella/rdom/functions/_replace.html).
 *
 * @param items
 * @param sel
 * @param opts
 */
export const staticDropdownAlt = <T = string, S extends string = string>(
	items: T[],
	sel: ISubscription<S, S>,
	opts?: Partial<DropdownOpts<T>>
) => {
	opts = {
		value: String,
		label: String,
		...opts,
	};
	return $replace(
		sel.map((id) =>
			select(
				{ onchange: $input(sel), ...opts!.attribs },
				...items.map((x) => {
					const value = opts!.value!(x);
					return option(
						{ value, selected: value === id },
						opts!.label!(x)
					);
				})
			)
		)
	);
};

const $option =
	<T, S extends string>(
		sel: ISubscription<S, S>,
		{ label, value }: DropdownOpts<T>
	) =>
	(x: T) => {
		let v = value(x);
		return option(
			{ value: v, selected: sel.map((x) => v === x) },
			label(x)
		);
	};
