import type { Fn } from "@thi.ng/api";
import { option, select, type SelectAttribs } from "@thi.ng/hiccup-html/forms";
import { $input } from "@thi.ng/rdom/event";
import { $list } from "@thi.ng/rdom/list";
import type { ISubscribable, ISubscription } from "@thi.ng/rstream";

export interface DropdownOpts<T> {
	attribs: Partial<SelectAttribs>;
	label: Fn<T, string>;
	value: Fn<T, string>;
}

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
