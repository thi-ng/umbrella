import type { Fn } from "@thi.ng/api";
import { option, select, type SelectAttribs } from "@thi.ng/hiccup-html/forms";
import { $input } from "@thi.ng/rdom/event";
import { $list } from "@thi.ng/rdom/list";
import type { ISubscribable, Subscription } from "@thi.ng/rstream";

export interface DropdownOpts<T> {
	attribs: Partial<SelectAttribs>;
	label: Fn<T, string>;
	value: Fn<T, string>;
}

export const dynamicDropdown = <T = string, S extends string = string>(
	items: ISubscribable<T[]>,
	sel: Subscription<S, S>,
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
		{ ...opts!.attribs, onchange: $input(sel) },
		$option(sel, <Required<DropdownOpts<T>>>opts)
	);
};

export const staticDropdown = <T = string, S extends string = string>(
	items: T[],
	sel: Subscription<S, S>,
	opts?: Partial<DropdownOpts<T>>
) => {
	opts = {
		value: String,
		label: String,
		...opts,
	};
	return select(
		{ ...opts.attribs, onchange: $input(sel) },
		...items.map($option(sel, <Required<DropdownOpts<T>>>opts))
	);
};

const $option =
	<T, S extends string>(
		sel: Subscription<S, S>,
		{ label, value }: DropdownOpts<T>
	) =>
	(x: T) => {
		let v = value(x);
		return option(
			{ value: v, selected: sel.map((x) => v === x) },
			label(x)
		);
	};
